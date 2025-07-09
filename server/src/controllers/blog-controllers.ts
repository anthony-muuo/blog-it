import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

export async function createBlog(req: Request, res: Response) {
  try {
    const { synopsis, content, featuredImage, title } = req.body;
    const { id } = req.user;
    await client.blog.create({
      data: {
        synopsis,
        content,
        featuredImage,
        title,
        userId: id,
      },
    });
    res.status(201).send({
      message: `${req.user.firstName} your post is created successfully`,
    });
  } catch (error) {
    res.status(400).send({ message: "error posting the blog to the db" });
  }
}

export async function getAllBlogs(req: Request, res: Response) {
  try {
    const { id } = req.user;
    const blogs = await client.blog.findMany({
      where: { userId: id },
    });
    res.status(200).send({ message: "here are the all posts", blogs });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "error fetching all blogs post",
    });
  }
}
