import { PrismaClient } from "@prisma/client";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function GET() {
    
    const gameData = await prisma.game.findMany();
    const playerData = await prisma.account.findMany();
    let numberGames = gameData.length;
    let numberPlayer = playerData.length;
    let activePlayer = 0;
    let player = [];
    for (let i = 0; i < gameData.length; i++) {
        player.push(gameData[i].player2 );
        player.push(gameData[i].player1 );
    }
    var uniq = player.reduce(function(a,b){
        if (a.indexOf(b) < 0 ) a.push(b);
        return a;
    },[]);
    activePlayer = uniq.length;
     
    let data = [numberGames, numberPlayer, activePlayer]
    return NextResponse.json(data);

}
 