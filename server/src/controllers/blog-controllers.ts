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

export async function getAllBlogsForSpecificUser(req: Request, res: Response) {
  try {
    const { id } = req.user;
    const blogs = await client.blog.findMany({
      where: { userId: id },
    });
    res.status(200).send({ message: "here are the all posts", blogs });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "error fetching all your blogs",
    });
  }
}

export async function getAllBlogs(req: Request, res: Response) {
  try {
    const blogs = await client.blog.findMany();
    res
      .status(200)
      .send({ message: "successfully fetched all the blogs", blogs });
  } catch (error) {
    res.status(500).send({ message: "error fetching all blogs post" });
  }
}

export async function getSpecificBlog(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const blog = await client.blog.findFirst({
      where: { id },
    });
    res.status(200).send({
      message: "successfully fetched this specific blog",
      blog,
    });
  } catch (error) {
    res.status(500).send({ message: "error fetching specific blog post" });
  }
}

export async function updateSpecificBlog(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { title, synopsis, content, featuredImage } = req.body;

    const updatedBlog = await client.blog.update({
      where: { id },
      data: {
        title: title && title,
        synopsis: synopsis && synopsis,
        content: content && content,
        featuredImage: featuredImage && featuredImage,
      },
    });

    res
      .status(200)
      .send({ message: "success updating specific blog", updatedBlog });
  } catch (error) {
    res.status(500).send({ message: "error updating specific blog post" });
  }
}

export async function deleteSpecificBlog(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const deleted = await client.blog.delete({
      where: {
        id,
      },
    });
    console.log("this is deleted", deleted);
    res.status(200).send({ message: "blog successfully deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "error updating specific blog post" });
  }
}
