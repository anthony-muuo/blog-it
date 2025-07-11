import { Link } from "react-router-dom";
const Header = () => {
  return (
    <div className="header">
      <div className="blog-div">
        <Link to="/" className="link">
          <h2 className="blog">BlogIt</h2>
        </Link>
      </div>
      <div className="header-buttons">
        <div className="group">
          <Link to="/login" className="link">
            <button className="ready">Login</button>
          </Link>
          <Link to="/signin" className="link">
            <button className="ready">Sign in</button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Header;
