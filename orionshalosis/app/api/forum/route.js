import { PrismaClient } from "@prisma/client";
import { headers } from "next/headers";
import jwt from "jsonwebtoken";
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
    console.log("topic : ", topic);
    const posts = await prisma.post.findMany({
      where: {
        topic: topic.idtopic,
      },
    });
    console.log("posts : ", posts);
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json(
      { message: "Unauthorized" },
      {
        status: 400,
      },
    );
  }
}

export async function POST(request) {
  const body = await request.json();
  console.log(body);
  try {
    await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        author: body.userId,
        datepost: new Date(),
      },
    });
    return NextResponse.json("200");
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