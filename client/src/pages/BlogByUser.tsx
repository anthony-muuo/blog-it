import { useParams } from "react-router-dom";
import { BASE_URL } from "../constant";
import userUser from "../store/userStore";
import { useQuery } from "@tanstack/react-query";

type BlogType = {
  title: string;
  content: string;
  featuredImage: string;
  lastUpdated: string;
};

async function fetchBlogById(id: string) {
  try {
    const res = await fetch(`${BASE_URL}/blogs/${id}`, {
      credentials: "include",
    });
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to fetch blog");
    }

    return data.blog;
  } catch (err) {
    console.error("Failed to fetch blog:", err);
  }
}

const BlogByUser = () => {
  const { id } = useParams();
  const user = userUser((state) => state.user);

  const {
    data: blog,
    isLoading,
    isError,
    error,
  } = useQuery<BlogType, Error>({
    queryKey: ["blog", id],
    queryFn: () => fetchBlogById(id!),
    enabled: !!id,
  });

  if (isLoading) return <div className="loading">Loading blog...</div>;
  if (isError) return <div className="error">Error: {error.message}</div>;
  if (!blog) return <div>No blog found</div>;

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
