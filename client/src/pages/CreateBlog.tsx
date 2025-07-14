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
  const [img, setImage] = useState<File | null>(null);
  const [imageUrlError, setImageError] = useState("");
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const navigate = useNavigate();

  const uploadImage = async (): Promise<string | null> => {
    if (!img) {
      setImageError("Image is required");
      return null;
    }

    const formData = new FormData();
    formData.append("file", img);
    formData.append("upload_preset", "antooo");

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dhetijarg/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || "Cloudinary upload failed");
      }

      return data.secure_url;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setImageError("Failed to upload image");
      return null;
    }
  };

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
      toast.success("Successfully created a blog");
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      setMessage(error.message || "Something went wrong");
    },
  });

  async function handleCreateBlog(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage("");
    setImageError("");

    setIsUploading(true);
    const imageUrl = await uploadImage();
    setIsUploading(false);
    if (!imageUrl) return;

    const blogPost: BlogPostProps = {
      title,
      synopsis,
      content,
      featuredImage: imageUrl,
    };

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
          type="file"
          accept="image/*"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              setImage(e.target.files[0]);
            }
          }}
          required
        />
        {imageUrlError && <p className="error">{imageUrlError}</p>}

        <button type="submit" disabled={isUploading || isPending}>
          {isUploading
            ? "Uploading Image..."
            : isPending
            ? "Creating Blog..."
            : "Create Blog"}
        </button>
        {message && <p className="create-blog-message">{message}</p>}
      </form>
    </div>
  );
};

export default CreateBlog;
