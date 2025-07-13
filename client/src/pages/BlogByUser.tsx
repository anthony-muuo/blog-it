import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { BASE_URL } from "../constant";
import userUser from "../store/userStore";

type BlogType = {
  title: string;
  content: string;
  featuredImage: string;
  lastUpdated: string;
};

const BlogByUser = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState<BlogType | null>(null);
  const user = userUser((state) => state.user);

  useEffect(() => {
    async function fetchBlog() {
      try {
        const res = await fetch(`${BASE_URL}/blogs/${id}`, {
          credentials: "include",
        });
        const data = await res.json();
        if (res.ok) setBlog(data.blog);
      } catch (err) {
        console.error("Failed to fetch blog:", err);
      }
    }

    fetchBlog();
  }, [id]);

  if (!blog) return <div className="loading">Loading blog...</div>;

  function capitalize(name?: string): string {
    if (!name) return "";
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  }

  function formatDate(dateString?: string): string {
    if (!dateString) return "Unknown date";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  return (
    <>
      <div className="blog-detail-container">
        <img
          src={blog.featuredImage}
          alt={blog.title}
          className="blog-banner"
        />
        <div className="blog-detailss">
          <h1 className="blog-title">{blog.title}</h1>
          <article className="blog-content">{blog.content}</article>
        </div>
      </div>
      <div className="created-by">
        <div className="author-avatar">
          {`${user?.firstName?.[0] ?? ""}${
            user?.lastName?.[0] ?? ""
          }`.toUpperCase()}
        </div>
        <div className="author-info">
          <p className="author-name">
            {`${capitalize(user?.firstName)} ${capitalize(user?.lastName)}`}
          </p>
          <p className="last-updated">
            Last updated on {formatDate(blog?.lastUpdated)}
          </p>
        </div>
      </div>
    </>
  );
};

export default BlogByUser;
