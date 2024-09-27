import userModel from "./models/userModel.js";

const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if ((!name, !email, !password)) {
      return res
        .status(400)
        .send({ sucess: false, message: "All fields are required" });
    }

    const isExist = await userModel.findOne({ email });
    if (isExist) {
      return res
        .status(400)
        .send({ success: false, message: "Email already exist" });
    }

    const newUser = await userModel.create({ name, email, password });

    return res
      .status(201)
      .send({ sucess: true, message: "User registration sucessful", newUser });
  } catch (error) {
    console.log(`registerController Error ${error}`);
    return res
      .status(400)
      .send({ success: false, message: "error in registerController", error });
  }
};

export { registerController };
