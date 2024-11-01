import express from "express";
import {
  registerController,
  loginController,
  logoutController,
  allUsersController,
} from "../controllers/userController.js";
import { isAuthorized, isAdmin } from "../middlewares/authMiddleware.js";

const userRouter = express.Router();

userRouter.post("/register", registerController);
userRouter.post("/login", loginController);
userRouter.post("/logout", logoutController);

userRouter.get("/all-users", isAuthorized, isAdmin, allUsersController);

export default userRouter;
