require("dotenv").config();
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(request) {
  const body = await request.json();
  console.log(body);
  const res = await prisma.account.findUnique({
    where: {
      email: body.email,
    },
  });
  return Response.json(res);
}
