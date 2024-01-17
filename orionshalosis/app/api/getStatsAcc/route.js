import { PrismaClient } from "@prisma/client";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function PUT(request) {
    let body = await request.json();
    body = body.iduser
    body = parseInt(body)
    const gameData = await prisma.game.findMany();
    const playerData = await prisma.account.findFirst({
        where: {
            iduser: body
        }
    });
    console.log(playerData)
    let numberGames = 0;
    for (let i = 0; i < gameData.length; i++) {
        if(gameData[i].player1 == playerData.iduser || gameData[i].player2 == playerData.iduser)
        numberGames = numberGames + 1;
    }
    let planetsCaptured = playerData.planetscaptured;
    let wins = playerData.wongames;
    let level = playerData.level;

    let data = [numberGames, wins, level, planetsCaptured]
    return NextResponse.json(data);

}
 