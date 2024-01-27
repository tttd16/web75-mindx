import asyncHandler from "express-async-handler";

import postModel from "../models/postModel.js";
import { isObjectIdOrHexString } from "mongoose";

export const createPost = asyncHandler(async (req, res) => {
  const { content } = req.body;
  const newPost = await postModel.create({
    content,
    userId: req.user._id,
  });
  if (newPost) {
    return res.status(201).send({
      data: newPost,
      success: true,
      error: "OK!",
    });
  } else {
    return res.status(400).send({
      data: null,
      success: false,
      error: "Falied!",
    });
  }
});

export const getPost = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  if (!isObjectIdOrHexString(postId))
    return res.status(400).send({
      success: false,
      error: "ID khong hop le",
    });
  const post = await postModel.findOne({ _id: postId, userId: req.user._id });
  if (post) {
    return res.status(200).send({
      data: post,
      success: true,
      error: "OK!",
    });
  } else {
    return res.status(400).send({
      data: null,
      success: false,
      error: "Falied!",
    });
  }
});

export const editPost = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  const { content } = req.body;
  if (!isObjectIdOrHexString(postId))
    return res.status(400).send({
      success: false,
      error: "ID khong ho le!",
    });

  const check = await postModel.updateOne({ _id: postId, userId: req.user._id }, { content: content });
  if (check.modifiedCount > 0) {
    return res.status(200).send({
      success: true,
      error: "UPDATE thanh cong!",
    });
  } else {
    return res.status(400).send({
      success: false,
      error: "Khong tim thay bai post",
    });
  }
});

export const deletePost = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  if (!isObjectIdOrHexString(postId))
    return res.status(400).send({
      success: false,
      error: "ID khong ho le!",
    });

  const check = await postModel.deleteOne({ _id: postId, userId: req.user._id });
  if (check.deletedCount > 0) {
    return res.status(200).send({
      success: true,
      error: "DELETE thanh cong!",
    });
  } else {
    return res.status(400).send({
      success: false,
      error: "Khong tim thay bai post",
    });
  }
});
