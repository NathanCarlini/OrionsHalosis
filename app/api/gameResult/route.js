import { PrismaClient } from "@prisma/client";
import { headers } from "next/headers";
const prisma = new PrismaClient();
import { NextResponse } from "next/server";

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
        iduser: body.player1,
      }, 
    });
    const player2 = await prisma.account.findUnique({
      where: {
        iduser: body.player2,
      }, 
    });
    if (body.victory == player1.iduser) {
      player1.wongames += 1;
      player1.level += 1;
      player2.losedgames += 1;
      player2.experience += 50;
      if (player2.experience == 100) {
        player2.level += 1;
        player2.experience -= 100;
      }
    } else if (body.victory == player2.iduser) {
      player2.wongames += 1;
      player2.level += 1;
      player1.losedgames += 1;
      player1.experience += 50;
      if (player1.experience == 100) {
        player1.level += 1;
        player1.experience -= 100;
      }
    }
    player1.planetscaptured = player1.planetscaptured + body.player1planets;
    player2.planetscaptured = player2.planetscaptured + body.player2planets;

    await prisma.account.update({
      where: {
        iduser: body.player1,
      },
      data: player1,
    });
    await prisma.account.update({
      where: {
        iduser: body.player2,
      },
      data: player2,
    }); // try catch

    return NextResponse.json("updated game");
  }
}
 