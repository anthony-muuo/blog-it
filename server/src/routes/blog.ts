import { Router } from "express";
import { createUser } from "../controllers/blog-conrollers";

const route = Router();

route.post("/register", createUser);

export default route;
