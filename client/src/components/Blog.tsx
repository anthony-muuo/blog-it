import { Link } from "react-router-dom";
type BlogProps = {
  title: string;
  synopsis: string;
  featuredImage: string;
  content: string;
  id: string;
};

const Blog = ({ title, synopsis, featuredImage, content, id }: BlogProps) => {
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
      </div>
    </div>
  );
};

export default Blog;
