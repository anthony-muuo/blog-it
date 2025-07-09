import { Request, Response } from "express";
// import { PrismaClient } from "@prisma/client";

// const client = new PrismaClient();

export async function createBlog(req: Request, res: Response) {
  try {
    // const { synopsis, content, featuredImage, title, userId } = req.body;
    // const blog = await client.blog.create({
    //   data: {
    //     synopsis,
    //     content,
    //     featuredImage,
    //     title,
    //     userId,
    //   },
    // });
    res
      .status(201)
      .send({
        message: `${req.user.firstName} your post is created successfully`,
      });
  } catch (error) {
    res.status(400).send({ message: "error posting the blog to the db" });
  }
}
