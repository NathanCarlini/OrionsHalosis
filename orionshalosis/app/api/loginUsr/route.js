import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
const bcrypt = require("bcrypt")

const prisma = new PrismaClient();

export async function PUT(request) {
  const body = await request.json();
  const res = await prisma.account.findFirst({
    where: {
      username: body.username,
    },
  });

  // if (body.password == res.password) {
  //   const token = jwt.sign({ userId: res.username }, process.env.JWT_SECRET, {
  //     expiresIn: "60m",
  //   });
  //   return NextResponse.json({ token });
  // } else {
  //   return NextResponse.json(
  //     { message: "Email or password not valid" },
  //     {
  //       status: 400,
  //     },
  //   );
  // }
  console.log(body.password);
  console.log(res.password);
  let datar = await bcrypt .compare(body.password, res.password)
  console.log(datar);
      if (datar == true) {
        const token = jwt.sign({ userId: res.username }, process.env.JWT_SECRET, {
          expiresIn: "365d",
        });
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
