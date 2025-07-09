import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { emailAddress, password } = req.body;
    const user = await client.user.findFirst({ where: { emailAddress } });
    if (!user) {
      res.status(401).send({ message: "wrong email or password" });
      return;
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      res.status(401).send({ message: "wrong email or password" });
      return;
    }

    const {
      password: userPassword,
      dateJoined,
      ...remainingUserDetails
    } = user;

    const token = jwt.sign(remainingUserDetails, process.env.JWT_SECRET!);

    res
      .cookie("authorization", token)
      .json(remainingUserDetails)
      .status(200)
      .send({
        message: "you have succesfully logged in",
      });
  } catch (error) {
    res.status(400).send({ message: "failed to login" });
  }
};

export function logoutUser(_req: Request, res: Response) {
  try {
    res.clearCookie("authorization");
    res.status(200).send({ message: "you have succesfully logout" });
  } catch (error) {
    res.status(400).send({
      message: "failed to logout",
    });
  }
}
