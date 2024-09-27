import userModel from "./models/userModel.js";

const registerController = async (req, res) => {
  const { name, email, password } = req.body;

  if ((!name, !email, !password)) {
    return res
      .status(400)
      .send({ sucess: false, message: "All fields are required" });
  }

  const newUser = await userModel.create({ name, email, password });
};

export { registerController };
