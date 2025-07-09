import { Router } from "express";
import {
  createUser,
  loginUser,
  logoutUser,
} from "../controllers/user-conrollers";
import { verifyUser } from "../middleware/verifyUser";
import { passwordStrength } from "../middleware/passwordStrength";
import { uniqueEmailAndUserName } from "../middleware/unique";
import { verifyLogin } from "../middleware/verifyLogin";
const route = Router();

route.post(
  "/auth/register",
  verifyUser,
  passwordStrength,
  uniqueEmailAndUserName,
  createUser
);

route.post("/auth/login", verifyLogin, loginUser);
route.post("/auth/logout", logoutUser);

export default route;
