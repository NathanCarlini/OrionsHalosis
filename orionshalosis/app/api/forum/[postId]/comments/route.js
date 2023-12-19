import { PrismaClient } from "@prisma/client";
import { headers } from "next/headers";

import { NextResponse } from "next/server";

const prisma = new PrismaClient();
export async function GET(request) {
    const postId = parseInt(request.query.postId, 10);
    const comments = await prisma.comment.findMany({
        where: { postId },
      });
      res.status(200).json(comments);
  }

  export async function POST(request) {
    const postId = parseInt(request.query.postId, 10);
    const { content, userId } = request.body;
    const comment = await prisma.comment.create({
      data: {
        content,
        userId,
        postId,
      },
    });
    res.status(201).json(comment);
  }