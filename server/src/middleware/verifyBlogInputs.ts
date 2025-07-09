import { Request, Response, NextFunction } from "express";

export function verifyBlogInputs(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { synopsis, title, content } = req.body;
  if (!synopsis) {
    res.status(400).send({ message: "synopsis is required" });
    return;
  }
  if (!title) {
    res.status(400).send({ message: "title is required" });
    return;
  }
  if (!content) {
    res.status(400).send({ message: "content is required" });
    return;
  }
  next();
}
