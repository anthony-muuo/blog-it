import Blog from "../components/Blog";
import { useState, useEffect } from "react";
import { type BlogTypeProps } from "./AllBlogs";
import { BASE_URL } from "../constant";

const YourBlogs = () => {
  const [blog, setBlog] = useState<BlogTypeProps[]>([]);

  useEffect(() => {
    async function individualBlog() {
      try {
        const response = await fetch(`${BASE_URL}/user/blogs`, {
          method: "GET",
          credentials: "include",
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message);
        }

        setBlog(data.blogs);
      } catch (error) {
        console.error("error fetching blogs", error);
      }
    }
    individualBlog();
  }, []);

  return (
    <div>
      {blog.map((single: BlogTypeProps) => (
        <div key={single.id}>
          <Blog
            content={single.content}
            synopsis={single.synopsis}
            featuredImage={single.featuredImage}
            title={single.title}
            id={single.id}
          />
          <button>delete</button>
        </div>
      ))}
    </div>
  );
};

export default YourBlogs;
