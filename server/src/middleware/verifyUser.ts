import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload, VerifyErrors } from "jsonwebtoken";
import { UserPayLoad } from "../types";

export function verfifyUser(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.cookies;

  if (!authorization) {
    res.status(401).send({ message: "Unauthorized. Please Login" });
    return;
  }

  jwt.verify(
    authorization,
    process.env.JWT_SECRET!,
    (err: VerifyErrors | null, decoded: JwtPayload | string | undefined) => {
      if (err) {
        res.status(401).send({ message: "Unauthorized. Please Login" });
        return;
      }
      req.user = decoded as UserPayLoad;
      next();
    }
  );
}
