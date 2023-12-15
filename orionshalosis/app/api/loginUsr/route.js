require("dotenv").config();
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";


const prisma = new PrismaClient();

export async function PUT(request) {
  const body = await request.json();
  const res = await prisma.account.findFirst ({
    where: {
      email: body.email,
    },
  });
  console.log(res);
  if (res.password == body.password) {
    const token = jwt.sign({ userId: res.email }, process.env.JWT_SECRET, {
      expiresIn: "60m",
    });
    return NextResponse.json({ token }, res);
  } else {
    return NextResponse.json(
      { message: "Email not valid" },
      {
        status: 400,
      },
    );
  }
}
