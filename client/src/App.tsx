import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Login from "./pages/Login";
import AllBlogs from "./pages/AllBlogs";
import CreateBlog from "./pages/CreateBlog";
import YourBlogs from "./pages/YourBlogs";
import BlogByUser from "./pages/BlogByUser";
import Profile from "./pages/Profile";
import UpdateBlog from "./pages/UpdateBlog";
import Protected from "./components/Protected";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <Header />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/blogs"
            element={
              <Protected>
                <AllBlogs />
              </Protected>
            }
          />
          <Route
            path="/createblog"
            element={
              <Protected>
                <CreateBlog />
              </Protected>
            }
          />
          <Route
            path="/yourblogs"
            element={
              <Protected>
                <YourBlogs />
              </Protected>
            }
          />
          <Route
            path="/blogs/:id"
            element={
              <Protected>
                <BlogByUser />
              </Protected>
            }
          />
          <Route
            path="/profile"
            element={
              <Protected>
                <Profile />
              </Protected>
            }
          />
          <Route
            path="/update/:id"
            element={
              <Protected>
                <UpdateBlog />
              </Protected>
            }
          />
        </Routes>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}

export default App;
