import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();
const bcrypt = require("bcrypt")
const saltRounds = 10
let dataFormat
const sleep = ms => new Promise(r => setTimeout(r, ms));

export async function POST(request) {
  const body = await request.json();
  const bp = body.password
  bcrypt
  .genSalt(saltRounds)
  .then(salt => {
    return bcrypt.hash(bp, salt)
  })
  .then(bp => {
    body.password = bp
    dataFormat = body
  })
  .catch(err => console.error(err.message))
    await sleep(300);
    
  await prisma.account.create({
    data: dataFormat,
  });
  const token = jwt.sign({ userId: dataFormat.email }, process.env.JWT_SECRET, {
    expiresIn: "365d",
  });


  return NextResponse.json({token });
}
 