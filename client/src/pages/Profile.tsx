import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { BASE_URL } from "../constant";
import { useNavigate } from "react-router-dom";
import userUser from "../store/userStore";

type updatePasswordProps = {
  oldPassword: string;
  newPassword: string;
};

type updateUserInfoProps = {
  firstName: string;
  lastName: string;
  userName: string;
  emailAddress: string;
};

const Profile = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [formError, setError] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");

  const logOut = userUser((state) => state.logOut);
  const user = userUser((state) => state.user);

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setUserName(user.userName);
      setEmailAddress(user.emailAddress);
    }
  }, [user]);

  async function updatePassword(password: updatePasswordProps) {
    try {
      const response = await fetch(`${BASE_URL}/user/password`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(password),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      return data;
    } catch (error) {
      console.error("error updating your password", error);
      throw error;
    }
  }

  const { mutate, isPending } = useMutation({
    mutationKey: ["update-password"],
    mutationFn: updatePassword,
  });

  function handleUpdatePassword(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const password: updatePasswordProps = { oldPassword, newPassword };
    mutate(password);
  }

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

  async function updateUserInfo(details: updateUserInfoProps) {
    const response = await fetch(`${BASE_URL}/user`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(details),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
  }

  const { mutate: mutateUserInfo, isPending: isUpdatingInfo } = useMutation({
    mutationKey: ["update-user-info"],
    mutationFn: updateUserInfo,
  });

  function handleUserInfoSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const userInfo = { firstName, lastName, emailAddress, userName };
    mutateUserInfo(userInfo);
  }

  return (
    <div className="profile-container">
      <h1 className="profile-title">Account Management</h1>

      <div className="info-form">
        <h2 className="form-title">Update Personal Info</h2>
        <form onSubmit={handleUserInfoSubmit}>
          <div className="form-group">
            <label>First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={emailAddress}
              onChange={(e) => setEmailAddress(e.target.value)}
            />
          </div>
          <button className="update-button" disabled={isUpdatingInfo}>
            {isUpdatingInfo ? "Updating..." : "Update Info"}
          </button>
        </form>
      </div>

      <div className="password-form">
        <h2 className="form-title">Change Password</h2>
        <form onSubmit={handleUpdatePassword}>
          <div className="form-group">
            <label htmlFor="current-password">Currrent Password</label>
            <input
              type="password"
              id="current-password"
              placeholder="Enter current password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="new-password">New Password</label>
            <input
              type="password"
              id="new-password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>

          {formError && <div className="error-message">{formError}</div>}
          <button className="update-button" disabled={isPending}>
            {isPending ? "Updating...." : "Update Password"}
          </button>
        </form>
      </div>

      <button className="logout-button" onClick={handleLogOut} type="button">
        Log Out
      </button>
    </div>
  );
};

export default Profile;
