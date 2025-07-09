import { Router } from "express";
import { createUser, loginUser } from "../controllers/user-conrollers";
import { verifyUser } from "../middleware/verifyUser";
import { passwordStrength } from "../middleware/passwordStrength";
import { uniqueEmailAndUserName } from "../middleware/unique";

const route = Router();

route.post(
  "/auth/register",
  verifyUser,
  passwordStrength,
  uniqueEmailAndUserName,
  createUser
);

route.post("/auth/login", loginUser);

export default route;
