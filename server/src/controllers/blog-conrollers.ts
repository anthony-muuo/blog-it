import express from "express";
import { Request, Response } from "express";

const app = express();
app.use(express.json());

export const createUser = (req: Request, res: Response) => {
  res.status(201).send("registering new user");
};
