import { Router } from "express";
import {
  createUser,
  loginUser,
  logoutUser,
} from "../controllers/user-conrollers";
import { verifyInputs } from "../middleware/verifyInputs";
import { passwordStrength } from "../middleware/passwordStrength";
import { uniqueEmailAndUserName } from "../middleware/unique";
import { verifyLogin } from "../middleware/verifyLogin";
import { verfifyUser } from "../middleware/verifyUser";
import { verifyBlogInputs } from "../middleware/verifyBlogInputs";

import {
  createBlog,
  getAllBlogs,
  getAllBlogsForSpecificUser,
  getSpecificBlog,
} from "../controllers/blog-controllers";
const route = Router();

route.post(
  "/auth/register",
  verifyInputs,
  passwordStrength,
  uniqueEmailAndUserName,
  createUser
);

route.post("/auth/login", verifyLogin, loginUser);
route.post("/auth/logout", logoutUser);

route.post("/blogs", verfifyUser, verifyBlogInputs, createBlog);
route.get("/user/blogs", verfifyUser, getAllBlogsForSpecificUser);
route.get("/blogs", verfifyUser, getAllBlogs);
route.get("/blogs/:id", getSpecificBlog);

export default route;
