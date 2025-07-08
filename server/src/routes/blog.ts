import { Router } from "express";
import { createUser } from "../controllers/blog-conrollers";
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

export default route;
