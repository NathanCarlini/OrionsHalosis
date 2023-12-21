import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";


const prisma = new PrismaClient();

export async function PUT(request) {
  const body = await request.json();
  const res = await prisma.account.findFirst ({
    where: {
      username: body.username,
    },
  });
  console.log(res);
  if (body.password == res.password) {
    console.log("tetetetete");
    const token = jwt.sign({ userId: res.username }, process.env.JWT_SECRET, {
      expiresIn: "60m",
    });
    console.log(token);
    return NextResponse.json({ token });
  } else {
    return NextResponse.json(
      { message: "Email or password not valid" },
      {
        status: 400,
      },
    );
  }
}
