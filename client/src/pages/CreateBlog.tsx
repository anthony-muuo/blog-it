import React, { useState } from "react";
import { BASE_URL } from "../constant";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

type BlogPostProps = {
  synopsis: string;
  title: string;
  content: string;
  featuredImage: string;
};

const CreateBlog = () => {
  const [synopsis, setSynopsis] = useState("");
  // const [featuredImageFile, setFeaturedImageFile] = useState<File | null>(null);
  const [featuredImage, setFeaturedImage] = useState("");

  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  // async function uploadImage(file: File) {
  //   const formData = new FormData();
  //   formData.append("image", file);

  //   const response = await fetch(`${BASE_URL}/upload`, {
  //     method: "POST",
  //     credentials: "include",
  //     body: formData,
  //   });

  //   const data = await response.json();

  //   if (!response.ok) {
  //     throw new Error(data.message || "Image upload failed");
  //   }

  //   return data.imageUrl;
  // }

  async function postBlog(blogPost: BlogPostProps) {
    try {
      const response = await fetch(`${BASE_URL}/blogs`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(blogPost),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      return data;
    } catch (error) {
      console.error("error creating your blog", error);
      throw error;
    }
  }

  const { mutate, isPending } = useMutation({
    mutationKey: ["create-blogPost"],
    mutationFn: postBlog,
    onSuccess: () => {
      navigate("/blogs");
      toast.success("successfully created a blog");
    },
    onError: (error) => {
      setMessage(error.message || "Something went wrong");
    },
  });

  async function handleCreateBlog(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage("");

    // try {
    //   let imageUrl = "";

    //   if (featuredImageFile) {
    //     imageUrl = await uploadImage(featuredImageFile);
    //   }

    //   const blogPost: BlogPostProps = {
    //     title,
    //     synopsis,
    //     content,
    //     featuredImage: imageUrl,
    //   };

    //   mutate(blogPost);
    // } catch (error) {
    //   console.error("Error uploading image or posting blog:", error);
    //   if (error instanceof Error) {
    //     setMessage(error.message || "Failed to create blog");
    //   } else {
    //     setMessage("Failed to create blog");
    //   }
    // }
    const blogPost: BlogPostProps = { title, synopsis, content, featuredImage };
    mutate(blogPost);
  }

  return (
    <div className="create-blog-container">
      <h2 className="create-blog-title">Create Blog</h2>
      <form onSubmit={handleCreateBlog} className="create-blog-form">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          name="synopsis"
          placeholder="Synopsis"
          value={synopsis}
          onChange={(e) => setSynopsis(e.target.value)}
          required
        />
        <textarea
          name="content"
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <input
          type="type"
          name="featuredImage"
          // accept="image/*"
          // onChange={(e) => {
          //   if (e.target.files && e.target.files[0]) {
          //     setFeaturedImageFile(e.target.files[0]);
          //   }
          // }}
          placeholder="Featured Image URL(ensure its working url as i fix to upload from file)"
          value={featuredImage}
          onChange={(e) => setFeaturedImage(e.target.value)}
        />
        <button disabled={isPending}>
          {isPending ? "Creating Blog..." : "Create Blog"}
        </button>
        {message && <p className="create-blog-message">{message}</p>}
      </form>
    </div>
  );
};

export default CreateBlog;
