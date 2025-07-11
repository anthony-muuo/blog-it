import { Link } from "react-router-dom";
import userUser from "../store/userStore";
import { BASE_URL } from "../constant";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const user = userUser((state) => state.user);
  const logOut = userUser((state) => state.logOut);

  const navigate = useNavigate();

  async function handleLogOut() {
    try {
      const response = await fetch(`${BASE_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) throw new Error("Failed to log out");

      logOut(); //this sets user to null in store
      localStorage.removeItem("blogit-user");

      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  }

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
            <Link to="#" className="link">
              Create Blog
            </Link>
            <div className="logout">
              <h1 className="welcome">
                welcome, <span>{user.firstName}</span>
              </h1>
              <button onClick={handleLogOut}>logout</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Header;
