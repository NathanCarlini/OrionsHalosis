import { PrismaClient } from "@prisma/client";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function POST(request) {
  const body = await request.json();

  await prisma.game.create({
    data: body,
  });

  return NextResponse.json("ok");
}
 