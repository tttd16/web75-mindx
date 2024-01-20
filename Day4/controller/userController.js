import userModel from "../models/userSchema.js";

export const register = async (req, res) => {
  try {
    const { userName } = req.body;
    if (!userName) throw new Error("chua co user");
    const userExist = await userModel.findOne({ userName });
    if (userExist) throw new Error("user da ton tai");
    const user = await userModel.create({ userName });
    res.status(201).send({
      data: user,
      sucess: true,
      msg: "Dang ky thanh cong!",
    });
  } catch (error) {
    res.status(400).send({
      data: null,
      sucess: true,
      msg: error.message,
    });
  }
};
