const Login = () => {
  return (
    <div className="login-container">
      <h2>Login to your Blog it Account</h2>
      <form className="signin-form">
        <div className="each-input">
          <label htmlFor="emailAddress">Email Address</label>
          <input
            type="email"
            id="emailAddress"
            name="emailAddress"
            placeholder="Enter email address"
          />
        </div>
        <div className="each-input">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Create a password"
          />
        </div>
        <button className="submit-button">LogIn</button>
      </form>
    </div>
  );
};

export default Login;
