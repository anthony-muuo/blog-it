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
          <Route path="/blogs" element={<AllBlogs />} />
          <Route path="/createblog" element={<CreateBlog />} />
          <Route path="/yourblogs" element={<YourBlogs />} />
          <Route path="/blogs/:id" element={<BlogByUser />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/update/:id" element={<UpdateBlog />} />
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
