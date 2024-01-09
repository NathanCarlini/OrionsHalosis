import { PrismaClient } from "@prisma/client";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function POST(request) {
  const body = await request.json();
  
  const gameData = await prisma.game.findFirst({
    where: {
      gameidentificator: body.gameidentificator
    }, 
  })

  if (gameData == null) {
    await prisma.game.create({
      data: body,
    });
    return NextResponse.json("created a new game");
  } else {
    body.idgame = gameData.idgame;
    await prisma.game.update({
      where: {
        idgame: gameData.idgame,
        gameidentificator: body.gameidentificator,
      },
      data: body,
    });

    const player1 = await prisma.account.findUnique({
      where: {
        iduser: gameData.player1,
      }, 
    });
    const player2 = await prisma.account.findUnique({
      where: {
        iduser: gameData.player2,
      }, 
    });
    console.log(player1, player2)
    if (gameData.victory == player1.iduser) {
      player1.wongames += 1;
      player1.level += 1;
      player2.losedgames += 1;
      player2.experience += 50;
      if (player2.experience == 100) {
        player2.level += 1;
        player2.experience -= 100;
      }
    } else if (gameData.victory == player2.iduser) {
      player2.wongames += 1;
      player2.level += 1;
      player1.losedgames += 1;
      player1.experience += 50;
      if (player1.experience == 100) {
        player1.level += 1;
        player1.experience -= 100;
      }
    }
    player1.planetscaptured = gameData.player1planets;
    player2.planetscaptured = gameData.player2planets;

    console.log(player1, player2)
    await prisma.account.update({
      where: {
        iduser: player1.iduser,
      },
      data: player1,
    });
    await prisma.account.update({
      where: {
        iduser: player2.iduser,
      },
      data: player2,
    }); // try catch

    return NextResponse.json("updated game");
  }
}
 