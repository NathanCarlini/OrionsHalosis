require("dotenv").config();
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export async function GET(request) {
    const body = await request.json()
    const res = await prisma.account.findUnique({
        where: {
            email: body.email
        }
      });
      if(res.password == request.password){
        return Response.json(true)

      }else{
        return Responsense.json(false)
      }

  }