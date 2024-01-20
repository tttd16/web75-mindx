import userModel from "../models/userSchema.js";
import postModel from "../models/postSchema.js";
import { isObjectIdOrHexString } from "mongoose";
import commentModel from "../models/commentSchema.js";

export const createPost = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!isObjectIdOrHexString(userId)) throw new Error("ID khong hop le");
    const { content } = req.body;
    if (!content) throw new Error("Chua co noi dung");
    const user = await userModel.findById(userId);
    if (!user) throw new Error("User khong ton tai");
    const newPost = await postModel.create({ content, userId });
    res.status(201).send({
      data: newPost,
      sucess: true,
      msg: "POST thanh cong!",
    });
  } catch (error) {
    res.status(400).send({
      data: null,
      sucess: true,
      msg: error.message,
    });
  }
};

export const editPost = async (req, res) => {
  try {
    const { userId, postId } = req.params;
    if (!isObjectIdOrHexString(userId) || !isObjectIdOrHexString(postId)) throw new Error("ID khong hop le");
    const { content } = req.body;
    if (!content) throw new Error("Chua co noi dung");
    const post = await postModel.findById(postId);
    if (!post) throw new Error("Post khong ton tai");
    if (post.userId.toString() !== userId) throw new Error("User k co quyen");
    post.content = content;
    await post.save();
    res.status(200).send({
      data: post,
      sucess: true,
      msg: "EDIT thanh cong!",
    });
  } catch (error) {
    res.status(400).send({
      data: null,
      sucess: true,
      msg: error.message,
    });
  }
};

export const getAllPostWithTopComment = async (req, res) => {
  try {
    const posts = await postModel.find({});
    const data = await Promise.all(
      posts.map(async (post) => {
        const user = await userModel.findById(post.userId);
        const comments = await commentModel.find({ postId: post._id }).limit(3);
        return {
          post: {
            _id: post._id,
            content: post.content,
            user: user,
          },
          comments: comments,
        };
      })
    );
    res.status(200).send({
      data: data,
      sucess: true,
      msg: "GET POST WITH COMMENT thanh cong!",
    });
  } catch (error) {
    res.status(400).send({
      data: null,
      sucess: true,
      msg: error.message,
    });
  }
};

export const getPostWithAllComment = async (req, res) => {
  try {
    const { postId } = req.params;
    if (!isObjectIdOrHexString(postId)) throw new Error("ID khong hop le");
    const post = await postModel.findById(postId);
    if (!post) throw new Error("Khong co bai post");
    const comments = await commentModel.find({ postId: postId });

    res.status(200).send({
      data: {
        post: {
          _id: post._id,
          content: post.content,
        },
        comments: comments,
      },
      sucess: true,
      msg: "GET ALL COMMENT IN POST thanh cong!",
    });
  } catch (error) {
    res.status(400).send({
      data: null,
      sucess: true,
      msg: error.message,
    });
  }
};
