import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { createPost, getPost, editPost, deletePost } from "../controller/postController.js";
import { validateInput } from "../middleware/validate.js";

const postRoute = express.Router();

postRoute.get("/:postId", protect, getPost);
postRoute.post("/", protect, validateInput, createPost);
postRoute.put("/:postId", protect, validateInput, editPost);
postRoute.delete("/:postId", protect, deletePost);

export default postRoute;
