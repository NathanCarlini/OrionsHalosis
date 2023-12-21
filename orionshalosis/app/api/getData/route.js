
import { PrismaClient } from "@prisma/client";
import { headers } from "next/headers";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request) {
  try {
    const headersInstance = headers();
    const authHeader = headersInstance.get("authorization");

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // if (!decoded) {
    //   return NextResponse.json(
    //     { message: "Expired" },
    //     {
    //       status: 400,
    //     },
    //   );
    // } else if (decoded.exp < Math.floor(Date.now() / 1000)) {
    //   return NextResponse.json(
    //     { message: "Expired" },
    //     {
    //       status: 400,
    //     },
    //   );
    // } else {
      const res = await prisma.account.findUnique({
        where: {
          email: decoded.userId,
        },
      });
      return NextResponse.json(
        { data: res },
        {
          status: 200,
        },
      );
    // }
  } catch (error) {
    console.error("Token verification failed", error);
    return NextResponse.json(
      { message: "Unauthorized" },
      {
        status: 400,
      },
    );
  }
}
