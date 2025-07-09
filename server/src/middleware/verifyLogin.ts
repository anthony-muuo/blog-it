import { NextFunction, Request, Response } from "express";

export function verifyLogin(req: Request, res: Response, next: NextFunction) {
  const { emailAddress, password } = req.body;
  if (!emailAddress) {
    res.status(400).send({ message: "email is required" });
    return;
  }
  if (!password) {
    res.status(400).send({ message: "password is required" });
    return;
  }
  next();
}
