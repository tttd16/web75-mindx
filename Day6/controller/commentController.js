import asyncHandler from "express-async-handler";

import commentModel from "../models/commentModel.js";

export const createComment = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  const { content } = req.body;
  if (!isObjectIdOrHexString(postId))
    return res.status(400).send({
      data: null,
      success: false,
      error: "ID khong hop le",
    });
  const newComment = await commentModel.create({ content, userId: req.user._id, postId: postId });
  if (newComment) {
    return res.status(201).send({
      data: newComment,
      success: true,
      error: "Comment thanh cong!",
    });
  } else {
    return res.status(500).send({
      data: null,
      success: false,
      error: "Server Error",
    });
  }
});

export const editComment = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  const { content } = req.body;
  if (!isObjectIdOrHexString(commentId))
    return res.status(400).send({
      data: null,
      success: false,
      error: "ID khong hop le",
    });
  const check = await commentModel.updateOne({ userId: req.user._id, _id: commentId }, { content: content });
  if (check.modifiedCount > 0) {
    return res.status(200).send({
      success: true,
      error: "update comment thanh cong!",
    });
  } else {
    return res.status(500).send({
      success: false,
      error: "Server Error",
    });
  }
});

export const deleteComment = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  if (!isObjectIdOrHexString(commentId))
    return res.status(400).send({
      success: false,
      error: "ID khong hop le",
    });
  const check = await commentModel.deleteOne({ _id: commentId, userId: req.user._id });
  if (check.deletedCount > 0) {
    return res.status(200).send({
      success: true,
      error: "Delete thanh cong!",
    });
  } else {
    return res.status(400).send({
      success: false,
      error: "Khong co bai post!",
    });
  }
});

export const getComment = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  if (!isObjectIdOrHexString(commentId))
    return res.status(400).send({
      success: false,
      error: "ID khong hop le",
    });
  const comment = await commentModel.findOne({ _id: commentId, userId: req.user._id });
  if (comment) {
    return res.status(200).send({
      data: comment,
      success: true,
      error: "OK!",
    });
  } else {
    return res.status(400).send({
      data: null,
      success: false,
      error: "Khong co tim thay",
    });
  }
});
