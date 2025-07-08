import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();
export async function uniqueEmailAndUserName(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { userName, emailAddress } = req.body;
  const similarEmail = await client.user.findFirst({ where: { emailAddress } });

  if (similarEmail) {
    res
      .status(400)
      .send({ message: "the email is already taken pick a different email" });
    return;
  }

  const similarUserName = await client.user.findFirst({ where: { userName } });

  if (similarUserName) {
    res.status(400).send({
      message: "the username is already taken, pick a different username",
    });
  }
  next();
}
