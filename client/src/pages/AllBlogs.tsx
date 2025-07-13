import Blog from "../components/Blog";
import { BASE_URL } from "../constant";
import { useState, useEffect } from "react";

export type BlogTypeProps = {
  id: string;
  title: string;
  synopsis: string;
  featuredImage: string;
  content: string;
};

const AllBlogs = () => {
  const [blogs, setBlogs] = useState<BlogTypeProps[]>([]);

  useEffect(() => {
    async function fetchAllBlogs() {
      try {
        const response = await fetch(`${BASE_URL}/blogs`, {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message);
        }

        setBlogs(data.blogs);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    }

    fetchAllBlogs();
  }, []);

  return (
    <div>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          title={blog.title}
          synopsis={blog.synopsis}
          featuredImage={blog.featuredImage}
          content={blog.content}
          id={blog.id}
        />
      ))}
    </div>
  );
};

export default AllBlogs;
