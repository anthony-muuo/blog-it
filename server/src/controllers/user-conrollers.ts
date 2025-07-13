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
      .cookie("authorization", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
      })
      .status(200)
      .json(remainingUserDetails);
  } catch (error) {
    res.status(400).send({ message: "failed to login" });
  }
};

export function logoutUser(_req: Request, res: Response) {
  try {
    res.clearCookie("authorization");
    res.status(200).send({ message: "you have succesfully logout" });
  } catch (error) {
    res.status(500).send({
      message: "failed to logout",
    });
  }
}

export async function updateUserInfo(req: Request, res: Response) {
  try {
    const userId = req.user.id;
    const { firstName, lastName, userName, emailAddress } = req.body;
    await client.user.update({
      where: { id: userId },
      data: {
        firstName: firstName && firstName,
        lastName: lastName && lastName,
        emailAddress: emailAddress && emailAddress,
        userName: userName && userName,
      },
    });
    res.status(200).send({ message: "successfully updated your information" });
  } catch (error) {
    res.status(500).send({
      message: "error updating your information",
    });
  }
}

export async function getAllUser(req: Request, res: Response) {
  try {
    await client.user.findMany();
    res.status(200).send({ message: "successfully fetched all users" });
  } catch (error) {
    res.status(500).send({ message: "error fetching all users" });
  }
}

export async function updateUserPassword(req: Request, res: Response) {
  try {
    const userId = req.user.id;
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      res
        .status(400)
        .send({ message: "Both current and new passwords are required." });
      return;
    }

    const user = await client.user.findUnique({ where: { id: userId } });
    if (!user) {
      res.status(404).send({ message: "User not found" });
      return;
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      res.status(400).send({ message: "Incorrect current password" });
      return;
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await client.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });

    res.status(200).send({ message: "Password updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Failed to update password" });
  }
}
