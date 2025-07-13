import { useQuery, useMutation } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../constant";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosinstance";

interface updateDetailsProps {
  title: string;
  synopsis: string;
  content: string;
}

const UpdateBlog = () => {
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [content, setContent] = useState("");

  const navigate = useNavigate();

  async function fetchBlogId() {
    try {
      const res = await fetch(`${BASE_URL}/blogs/${id}`, {
        credentials: "include",
        method: "GET",
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to fetch blog");

      return data.blog;
    } catch (error) {
      console.error("error fetching blog", error);
      throw error;
    }
  }

  const { data, isLoading, error } = useQuery({
    queryKey: ["blog", id],
    queryFn: fetchBlogId,
    enabled: !!id,
  });

  useEffect(() => {
    if (data) {
      setTitle(data.title);
      setSynopsis(data.synopsis);
      setContent(data.content);
    }
  }, [data]);

  const mutation = useMutation({
    mutationFn: async (newDetails: updateDetailsProps) => {
      const response = await axiosInstance.put(`/api/blogs/${id}`, newDetails);
      return response.data;
    },
    onSuccess: () => {
      navigate("/your-blogs");
    },
    onError: (err) => {
      console.error(err);
    },
  });

  if (isLoading) return <p>Loading blog data...</p>;
  if (error) return <p>Error loading blog.</p>;

  return (
    <div className="update-container">
      <h2>Edit Blog Post</h2>
      <form
        className="update-form"
        onSubmit={(e) => {
          e.preventDefault();
          const updateDetails = { title, synopsis, content };
          mutation.mutate(updateDetails);
        }}
      >
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="synopsis">Synopsis</label>
        <input
          id="synopsis"
          type="text"
          required
          value={synopsis}
          onChange={(e) => setSynopsis(e.target.value)}
        />

        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          rows={10}
          required
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? "Updating..." : "Update Blog"}
        </button>
      </form>
    </div>
  );
};

export default UpdateBlog;
