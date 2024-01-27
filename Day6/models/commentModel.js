import mongoose from "mongoose";
const { Schema } = mongoose;

const commentSchema = new Schema(
  {
    content: { type: String, required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Post",
    },
  },
  {
    timestamps: true,
  }
);

const commentModel = mongoose.model("comment", commentSchema);

export default commentModel;
