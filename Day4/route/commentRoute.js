import express from "express";
import { createComment, editComment, getAllInPost } from "../controller/commentController.js";

const commentRoute = express.Router();

commentRoute.get("/:postId", getAllInPost);
commentRoute.post("/:postId", createComment);
commentRoute.put("/:commentId/user/:userId", editComment);

export default commentRoute;
