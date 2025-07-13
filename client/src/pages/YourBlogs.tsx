import { useState, useEffect } from "react";
import { type BlogTypeProps } from "./AllBlogs";
import { BASE_URL } from "../constant";
import { Link } from "react-router-dom";

function Blog({ title, synopsis, featuredImage, content, id }: BlogTypeProps) {
  return (
    <div className="card">
      <div className="image-container">
        <img src={featuredImage} alt={title} className="featured-image" />
      </div>

      <div className="card-content">
        <div className="card-explanation">
          <h2 className="blog-title">{title}</h2>
          <p className="blog-synopsis">{synopsis}</p>
          <p className="blog-content-preview">
            {content.slice(0, 20)}...{" "}
            <Link to={`/blogs/${id}`} className="read-more">
              Read more
            </Link>
          </p>
        </div>
        <div className="stay-to-date">
          <button className="update">update</button>
          <button className="delete">delete</button>
        </div>
      </div>
    </div>
  );
}

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
        </div>
      ))}
    </div>
  );
};

export default YourBlogs;
