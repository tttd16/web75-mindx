import asyncHandler from "express-async-handler";

import userModel from "../models/userModel.js";

export const register = asyncHandler(async (req, res) => {
  const { username, email, password, roles } = req.body;
  const lowerCaseEmail = email.toLowerCase();
  const user = await userModel.findOne({ email: email });
  if (user) {
    return res.status(400).send({ msg: "User da ton tai!" });
  }
  await userModel.create({ username, email: lowerCaseEmail, password, roles: roles || "user" });
  return res.status(201).send({ msg: "Dang ky thanh cong!" });
});

export const getAllUser = asyncHandler(async (req, res) => {
  const users = await userModel.find({});
  if (users) {
    return res.status(200).send({
      data: users,
      success: true,
      error: "OK!",
    });
  } else {
    return res.status(400).send({
      data: null,
      success: false,
      error: "Falied",
    });
  }
});
