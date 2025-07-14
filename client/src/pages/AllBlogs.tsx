import Blog from "../components/Blog";
import { BASE_URL } from "../constant";
import { useQuery } from "@tanstack/react-query";

export type BlogTypeProps = {
  id: string;
  title: string;
  synopsis: string;
  featuredImage: string;
  content: string;
};

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

    return data.blogs;
  } catch (error) {
    console.error("Error fetching blogs:", error);
  }
}

const AllBlogs = () => {
  const {
    data: blogs,
    isLoading,
    isError,
    error,
  } = useQuery<BlogTypeProps[]>({
    queryKey: ["all-blogs"],
    queryFn: fetchAllBlogs,
  });

  if (isLoading) return <div>Loading blogs...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className="blog-parent">
      {blogs?.map((blog) => (
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
