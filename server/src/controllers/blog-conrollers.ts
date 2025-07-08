import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const client = new PrismaClient();

export const createUser = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, emailAddress, userName, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await client.user.create({
      data: {
        firstName,
        lastName,
        userName,
        emailAddress,
        password: hashedPassword,
      },
    });
    res.status(201).send({ message: "user created sucessfully" });
  } catch (error) {
    console.log(error);
  }
};
