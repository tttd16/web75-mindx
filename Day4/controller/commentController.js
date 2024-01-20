import postModel from "../models/postSchema.js";
import commentModel from "../models/commentSchema.js";
import { isObjectIdOrHexString } from "mongoose";
import userModel from "../models/userSchema.js";

export const createComment = async (req, res) => {
  try {
    const { postId } = req.params;
    const { comment } = req.body;
    if (!comment) throw new Error(" Khong co Comment");
    if (!isObjectIdOrHexString(postId)) throw new Error(" Id khong hop le");
    const post = await postModel.findById(postId);
    if (!post) throw new Error(" Khong co bai POST");
    const newCommet = await commentModel.create({ comment, userId: post.userId, postId });
    res.status(201).send({
      data: newCommet,
      sucess: true,
      msg: "COMMENT thanh cong!",
    });
  } catch (error) {
    res.status(400).send({
      data: null,
      sucess: true,
      msg: error.message,
    });
  }
};

export const editComment = async (req, res) => {
  try {
    const { commentId, userId } = req.params;
    const { comment } = req.body;
    if (!comment) throw new Error(" Khong co Comment");
    if (!isObjectIdOrHexString(commentId) || !isObjectIdOrHexString(userId)) throw new Error(" Id khong hop le");
    const commentData = await commentModel.findById(commentId);
    if (!commentData) throw new Error(" Khong co bai COMMENT");
    if (commentData.userId.toString() !== userId) throw new Error("user nay khong co quyen");
    commentData.comment = comment;
    await commentData.save();
    res.status(200).send({
      data: commentData,
      sucess: true,
      msg: "EDIT COMMENT thanh cong!",
    });
  } catch (error) {
    res.status(400).send({
      data: null,
      sucess: true,
      msg: error.message,
    });
  }
};

export const getAllInPost = async (req, res) => {
  try {
    const { postId } = req.params;
    if (!isObjectIdOrHexString(postId)) throw new Error(" Id khong hop le");
    const comments = await commentModel.find({ postId: postId });
    if (!comments) throw new Error("K co comment nao trong bai post");
    res.status(200).send({
      data: comments,
      sucess: true,
      msg: "GET COMMENT thanh cong!",
    });
  } catch (error) {
    res.status(400).send({
      data: null,
      sucess: true,
      msg: error.message,
    });
  }
};
