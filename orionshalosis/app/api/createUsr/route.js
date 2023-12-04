require("dotenv").config();
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request) {
  const body = await request.json()
    console.log(body);
    const res = await prisma.account.create({
        data: body,
      });
      
    return Response.json(request)
  }