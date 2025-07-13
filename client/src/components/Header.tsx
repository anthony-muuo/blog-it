import { Link } from "react-router-dom";
import userUser from "../store/userStore";

const Header = () => {
  const user = userUser((state) => state.user);

  return (
    <div className="header">
      <div className="blog-div">
        <Link to="/" className="link">
          <h2 className="blog">BlogIt</h2>
        </Link>
      </div>
      <div className="header-buttons">
        {!user ? (
          <div className="group">
            <Link to="/login" className="link">
              <button className="ready">Login</button>
            </Link>
            <Link to="/signin" className="link">
              <button className="ready">Sign in</button>
            </Link>
          </div>
        ) : (
          <div className="links">
            <Link to="/blogs" className="link">
              All Blogs
            </Link>
            <Link to="/createblog" className="link">
              Create Blog
            </Link>
            <Link to="/yourblogs" className="link">
              Your Blogs
            </Link>
            <Link to="/profile" className="link">
              Profile
            </Link>
            <div className="parent-welcome">
              <h1 className="welcome">
                welcome, <span>{user.firstName}</span>
              </h1>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Header;
