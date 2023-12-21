import { PrismaClient } from "@prisma/client";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function POST(request) {
  const body = await request.json();
  

  const test = await prisma.game.findFirst({
    where: {
      gameidentificator: body.gameidentificator
    }, 
  })

  if (test == null) {
    await prisma.game.create({
      data: body,
    });
    return NextResponse.json("created a new game");
  } else {
    body.idgame = test.idgame;
    await prisma.game.update({
      where: {
        idgame: test.idgame,
        gameidentificator: body.gameidentificator,
      },
      data: body,
    });
    return NextResponse.json("updated game");
  }
}
 