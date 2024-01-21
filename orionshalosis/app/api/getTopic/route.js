import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();


export async function PUT(request) {
  try {
    const body = await request.json();
    console.log("body : ", body.topicname);
    const topic = await prisma.topic.findFirst({
      where: {
        topicname: body.topicname,
      },
    });
return NextResponse.json(topic);
  } catch (error) {
    return NextResponse.json(
      { message: "Unauthorized" },
      {
        status: 400,
      },
    );
  }
}