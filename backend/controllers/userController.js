import userModel from "../models/userModel.js";
import { encryptPassword, matchPassword } from "../helper/userHelper.js";
import jwt from "jsonwebtoken";

const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .send({ success: false, message: "All fields are required" });
    }

    const isExist = await userModel.findOne({ email });
    if (isExist) {
      return res
        .status(400)
        .send({ success: false, message: "Email already exist" });
    }

    const hashedPassword = await encryptPassword(password);
    const newUser = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });

    return res
      .status(201)
      .send({ success: true, message: "User registration sucessful", newUser });
  } catch (error) {
    console.log(`registerController Error ${error}`);
    return res
      .status(400)
      .send({ success: false, message: "error in registerController", error });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .send({ success: false, message: "All fields are required." });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .send({ success: false, message: "Email not registered." });
    }

    const isMatch = await matchPassword(password, user.password);

    if (!isMatch) {
      return res
        .status(400)
        .send({ success: false, message: "Incorrect Email/Password." });
    }
    const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXP,
    });

    user.password = undefined;

    return res
      .cookie("token", token, { httpOnly: true, secure: true })
      .status(200)
      .send({ success: true, message: "Login Succesful", user, token });
  } catch (error) {
    console.log(`loginController Error: ${error}`);
    return res
      .status(400)
      .send({ success: false, message: "error in loginController" }, error);
  }
};

const logoutController = async (req, res) => {
  return res
    .cookie("token", "", { httpOnly: true, secure: true, expires: new Date(0) })
    .status(200)
    .send({ success: true, message: "Logout Successful." });
};

const allUsersController = async (req, res) => {
  try {
    const users = await userModel.find({});

    if (!users) {
      return res
        .status(404)
        .send({ success: false, message: "No users found in database." });
    }

    return res.status(200).send({ success: true, total: users.length, users });
  } catch (error) {
    console.log(`allUsersController Error ${error}`);
    return res
      .status(400)
      .send({ sucess: false, message: "error in allUsersController" }, error);
  }
};

export {
  registerController,
  loginController,
  logoutController,
  allUsersController,
};
