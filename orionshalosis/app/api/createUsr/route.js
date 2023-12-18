'use client'
require("dotenv").config();
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function POST(request) {
  const body = await request.json();
  console.log(body);
  await prisma.account.create({
    data: body,
  });
  // const user = await authenticateUser(username, password);
  const token = jwt.sign({ userId: body.email }, process.env.JWT_SECRET, {
    expiresIn: "60m",
  });
  return NextResponse.json({ token });
}
 