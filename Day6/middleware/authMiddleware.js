import asyncHandler from "express-async-handler";

import userModel from "../models/userModel.js";

export const protect = asyncHandler(async (req, res, next) => {
  const email = req.headers?.["x-email"];
  if (email) {
    const user = await userModel.findOne({ email: email });
    if (!user) {
      return res.status(400).send({
        data: null,
        success: false,
        error: "Xac thuc khong thanh cong!",
      });
    }
    req.user = user;
    next();
  } else {
    return res.status(400).send({
      data: null,
      success: false,
      error: "X-email khong ton tai",
    });
  }
});

export const isAdmin = asyncHandler(async (req, res, next) => {
  if (req.user && req.user.roles === "admin") {
    next();
  } else {
    return res.status(400).send({
      data: null,
      success: false,
      error: "Member is not Admin",
    });
  }
});
