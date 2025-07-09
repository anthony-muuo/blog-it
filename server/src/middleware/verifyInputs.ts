import { Request, Response, NextFunction } from "express";
export function verifyInputs(req: Request, res: Response, next: NextFunction) {
  const { firstName, lastName, emailAddress, userName, password } = req.body;
  if (!firstName) {
    res.status(400).send({ message: "firstName is required" });
    return;
  }
  if (!lastName) {
    res.status(400).send({ message: "lastName is required" });
    return;
  }
  if (!emailAddress) {
    res.status(400).send({ message: "emailAddress is required" });
    return;
  }
  if (!userName) {
    res.status(400).send({ message: "userName is required" });
    return;
  }
  if (!password) {
    res.status(400).send({ message: "password is required" });
    return;
  }
  next();
}
