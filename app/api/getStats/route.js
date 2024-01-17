import { PrismaClient } from "@prisma/client";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function GET() {
    
    const gameData = await prisma.game.findMany();
    const playerData = await prisma.account.findMany();
    for (let i = 0; i < playerData.length; i++) {

    }
    let numberGames = gameData.length;
    let numberPlayer = playerData.length;
    let activePlayer = 0;
    let player = [];
    for (let i = 0; i < gameData.length; i++) {
        player.push(gameData[i].player2 );
        player.push(gameData[i].player1 );
    }
    let planetsCaptured = 0;
    for (let i = 0; i < gameData.length; i++) {
        planetsCaptured = planetsCaptured + gameData[i].player1planets + gameData[i].player2planets;
    }
    var uniq = player.reduce(function(a,b){
        if (a.indexOf(b) < 0 ) a.push(b);
        return a;
    },[]);
    activePlayer = uniq.length;

    // Filter the best players by level and then by experience
    const bestPlayers = playerData.sort((a, b) => {
        if (a.level !== b.level) {
            return b.level - a.level; 
        } else {
            return b.experience - a.experience;
        }
    });

    let data = [numberGames, numberPlayer, activePlayer, bestPlayers, planetsCaptured]
    return NextResponse.json(data);

}
 