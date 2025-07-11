import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { BASE_URL } from "../constant";

type NewBlogProps = {
  firstName: string;
  lastName: string;
  emailAddress: string;
  password: string;
  userName: string;
};

const Signin = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [confirm, setConfirm] = useState("");
  const [formError, setFormError] = useState("");

  const navigate = useNavigate();

  async function postBlog(newBlog: NewBlogProps) {
    try {
      const response = await fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newBlog),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      return data;
    } catch (error) {
      console.error("Failed to create account:", error);
      throw error;
    }
  }

  const { mutate, isPending } = useMutation({
    mutationKey: ["createblog"],
    mutationFn: postBlog,
    onError: (error: Error) => {
      setFormError(error.message);
    },
    onSuccess: () => {
      navigate("/login");
    },
  });

  function handleCreateBlog(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setFormError("");

    if (confirm !== password) {
      setFormError("passwords should match");
      return;
    }
    const newBlog: NewBlogProps = {
      firstName,
      lastName,
      userName,
      password,
      emailAddress,
    };
    mutate(newBlog);
  }

  return (
    <div className="signin-container">
      {formError && <div className="form-error">{formError}</div>}
      <h2>Sign In to Your Account</h2>
      <form className="signin-form" onSubmit={handleCreateBlog}>
        <div className="form-grouphandleCreateBlog">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            placeholder="Enter first name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            placeholder="Enter last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <div className="form-group">
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

        <div className="form-group">
          <label htmlFor="userName">Username</label>
          <input
            type="text"
            id="userName"
            name="userName"
            placeholder="Choose a username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>

        <div className="form-group">
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

        <div className="form-group">
          <label htmlFor="confirm">Confirm Password</label>
          <input
            type="password"
            id="confirm"
            name="confirm"
            placeholder="Confirm password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />
        </div>

        <button className="submit-button" disabled={isPending}>
          {isPending ? "Creating..." : "Create Account"}
        </button>
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
