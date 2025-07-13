import { Router } from "express";
import {
  createUser,
  getAllUser,
  loginUser,
  logoutUser,
  updateUserInfo,
  updateUserPassword,
} from "../controllers/user-conrollers";
import { verifyInputs } from "../middleware/verifyInputs";
import { passwordStrength } from "../middleware/passwordStrength";
import { uniqueEmailAndUserName } from "../middleware/unique";
import { verifyLogin } from "../middleware/verifyLogin";
import { verfifyUser } from "../middleware/verifyUser";
import { verifyBlogInputs } from "../middleware/verifyBlogInputs";

import {
  createBlog,
  deleteSpecificBlog,
  getAllBlogs,
  getAllBlogsForSpecificUser,
  getSpecificBlog,
  updateSpecificBlog,
} from "../controllers/blog-controllers";
import {
  uploadImage,
  uploadMiddleware,
} from "../controllers/upload-controller";
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
route.patch("/user", verfifyUser, updateUserInfo);
route.get("/users", getAllUser);
route.patch("/user/password", verfifyUser, updateUserPassword);

route.post("/blogs", verfifyUser, verifyBlogInputs, createBlog);
route.get("/user/blogs", verfifyUser, getAllBlogsForSpecificUser);
route.get("/blogs", verfifyUser, getAllBlogs);
route.get("/blogs/:id", verfifyUser, getSpecificBlog);
route.patch("/blogs/:id", verfifyUser, updateSpecificBlog);
route.delete("/blogs/:id", verfifyUser, deleteSpecificBlog);

route.post("/upload", uploadMiddleware, uploadImage);

export default route;
