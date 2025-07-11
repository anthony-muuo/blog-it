import { Link } from "react-router-dom";

const Signin = () => {
  return (
    <div className="signin-container">
      <h2>Sign In to Your Account</h2>
      <form className="signin-form">
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            placeholder="Enter first name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            placeholder="Enter last name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="emailAddress">Email Address</label>
          <input
            type="email"
            id="emailAddress"
            name="emailAddress"
            placeholder="Enter email address"
          />
        </div>

        <div className="form-group">
          <label htmlFor="userName">Username</label>
          <input
            type="text"
            id="userName"
            name="userName"
            placeholder="Choose a username"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Create a password"
          />
        </div>

        <div className="form-group">
          <label htmlFor="confirm">Confirm Password</label>
          <input
            type="password"
            id="confirm"
            name="confirm"
            placeholder="Confirm password"
          />
        </div>

        <button className="submit-button">Create Account</button>
        <p className="already">
          Already have an account ?{" "}
          <Link to="/login" className="link">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signin;
