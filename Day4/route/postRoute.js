import express from "express";
import { createPost, editPost, getAllPostWithTopComment, getPostWithAllComment } from "../controller/postController.js";

const postRoute = express.Router();

postRoute.get("/", getAllPostWithTopComment);
postRoute.get("/:postId/comments", getPostWithAllComment);
postRoute.post("/:userId", createPost);
postRoute.put("/:postId/user/:userId", editPost);

export default postRoute;
