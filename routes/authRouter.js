import express from "express";
import { loginHandler, myInfoHandler, registerHandler } from "../controllers/authController.js";
import protect from "../middleware/auth.js";

const authRouter = express.Router();

authRouter.post("/register", registerHandler);

authRouter.post("/login", loginHandler);

authRouter.get("/myinfo", protect, myInfoHandler);

export default authRouter;
