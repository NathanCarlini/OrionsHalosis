
import { PrismaClient } from "@prisma/client";
import { headers } from "next/headers";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

  export async function GET(request) {
    const body = await request.json();
    const posts = await prisma.post.findMany({
        where:{
            //filtrer par topic
        }
    });
    res.status(200).json(posts);
  }

  export async function POST(request) {
    const { title, content, userId } = request.body;
    const post = await prisma.post.create({
      data: {
        title,
        content,
        userId,
      },
    });
    res.status(201).json(post);
  }