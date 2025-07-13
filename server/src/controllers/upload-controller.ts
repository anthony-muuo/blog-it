import { Request, Response } from "express";
import multer from "multer";
import fs from "fs";
import cloudinary from "../lib/cloudinary";

const uploadDir = "uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const upload = multer({ dest: "uploads/" });

export const uploadMiddleware = upload.single("image");

export async function uploadImage(req: Request, res: Response) {
  try {
    const file = req.file;

    if (!file) {
      res.status(400).send({ message: "No image uploaded" });
      return;
    }

    const result = await cloudinary.uploader.upload(file.path, {
      folder: "blog_images",
    });

    // remove file from server
    fs.unlinkSync(file.path);

    res.status(200).send({
      message: "Image uploaded successfully",
      imageUrl: result.secure_url,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error uploading image" });
  }
}
