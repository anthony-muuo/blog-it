import { Router } from "express";
import { createUser } from "../controllers/blog-conrollers";

const route = Router();

route.post("/auth/register", createUser);

export default route;
