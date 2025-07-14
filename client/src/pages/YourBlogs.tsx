import { type BlogTypeProps } from "./AllBlogs";
import { BASE_URL } from "../constant";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";

function Blog({
  title,
  synopsis,
  featuredImage,
  content,
  id,
  onDelete,
}: BlogTypeProps & { onDelete: (id: string) => void }) {
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
          <Link to={`/update/${id}`}>
            <button className="update">update</button>
          </Link>
          <button className="delete" onClick={() => onDelete(id)}>
            delete
          </button>
        </div>
      </div>
    </div>
  );
}

async function fetchUserBlogs() {
  const response = await fetch(`${BASE_URL}/user/blogs`, {
    method: "GET",
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data.blogs;
}

async function deleteBlog(id: string) {
  const response = await fetch(`${BASE_URL}/blogs/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }
}

const YourBlogs = () => {
  const queryClient = useQueryClient();

  const {
    data: blog = [],
    isLoading,
    isError,
    error,
  } = useQuery<BlogTypeProps[], Error>({
    queryKey: ["userBlogs"],
    queryFn: fetchUserBlogs,
  });

  const mutation = useMutation({
    mutationFn: deleteBlog,
    onSuccess: () => {
      toast.success("Successfully deleted blog");
      queryClient.invalidateQueries({ queryKey: ["userBlogs"] });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const handleDelete = (id: string) => {
    mutation.mutate(id);
  };

  if (isLoading) return <p>Loading your blogs...</p>;
  if (isError) return <p>Error: {error?.message}</p>;

  return (
    <>
      {blog.length > 0 ? (
        <div className="blog-parent">
          {blog.map((single: BlogTypeProps) => (
            <div key={single.id} className="blog-parent-parent">
              <Blog
                content={single.content}
                synopsis={single.synopsis}
                featuredImage={single.featuredImage}
                title={single.title}
                id={single.id}
                onDelete={handleDelete}
              />
            </div>
          ))}
        </div>
      ) : (
        <p className="no">YOu have no created blogs</p>
      )}
    </>
  );
};

export default YourBlogs;
