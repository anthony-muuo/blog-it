import { BASE_URL } from "../constant";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import userUser from "../store/userStore";

type LoginProps = {
  emailAddress: string;
  password: string;
};

const Login = () => {
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setError] = useState("");
  const setUser = userUser((state) => state.setUser);

  const navigate = useNavigate();

  async function postLogin(login: LoginProps) {
    try {
      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(login),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      return data;
    } catch (error) {
      console.error("failed to login", error);
      throw error;
    }
  }

  const { mutate, isPending } = useMutation({
    mutationKey: ["user-login"],
    mutationFn: postLogin,
    onError: (error) => {
      setError(error.message);
    },
    onSuccess: (data) => {
      setUser(data);
      navigate("/blogs");
    },
  });

  function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const login: LoginProps = { emailAddress, password };
    mutate(login);
  }

  return (
    <div className="login-container">
      {formError && <div className="form-error">{formError}</div>}
      <h2>Login to your Blog it Account</h2>
      <form className="signin-form" onSubmit={handleLogin}>
        <div className="each-input">
          <label htmlFor="emailAddress">Email Address</label>
          <input
            type="email"
            id="emailAddress"
            name="emailAddress"
            placeholder="Enter email address"
            value={emailAddress}
            onChange={(e) => setEmailAddress(e.target.value)}
          />
        </div>
        <div className="each-input">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="submit-button" disabled={isPending}>
          {isPending ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
