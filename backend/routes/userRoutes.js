import express from "express";
import {
  registerController,
  loginController,
  logoutController
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/register", registerController);
userRouter.post("/login", loginController);
userRouter.post("/logout", logoutController)

export default userRouter;
