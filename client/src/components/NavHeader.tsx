import { Link } from "react-router-dom";

const NavHeader = () => {
  return (
    <div className="header">
      <div>
        <div className="blog-div">
          <Link to="/" className="link">
            <h2 className="blog">BlogIt</h2>
          </Link>
        </div>
      </div>
      <div className="links">
        <Link to="#" className="link">
          Create Blog
        </Link>
        <Link to="#" className="link">
          All Blogs
        </Link>
      </div>
      <div className="logout">
        <h1>welcome, anthony</h1>
        <button>logout</button>
      </div>
    </div>
  );
};

export default NavHeader;
