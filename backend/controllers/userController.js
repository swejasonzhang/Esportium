import userModel from "../models/userModel.js";
import { encryptPassword, matchPassword } from "../helper/userHelper.js";

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

    user.password = undefined;
  } catch (error) {
    console.log(`loginController Error: ${error}`);
    return res
      .status(400)
      .send({ success: false, message: "error in loginController" }, error);
  }
};

export { registerController, loginController };
