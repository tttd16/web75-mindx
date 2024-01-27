import express from "express";

import { protect } from "../middleware/authMiddleware.js";
import { validateInput } from "../middleware/validate.js";
import { getComment, createComment, editComment, deleteComment } from "../controller/commentController.js";

const commentRoute = express.Router();

commentRoute.get("/:commentId", protect, getComment);
commentRoute.post("/:postId", protect, validateInput, createComment);
commentRoute.put("/:commentId", protect, validateInput, editComment);
commentRoute.delete("/:commentId", protect, deleteComment);

export default commentRoute;
