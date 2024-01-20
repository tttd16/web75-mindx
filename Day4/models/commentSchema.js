import mongoose from "mongoose";

const { Schema } = mongoose;

const commentSchema = new Schema({
  comment: { type: String, require: true },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: "User",
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: "Post",
  },
  createdAt: { type: Date, default: Date.now },
});

const commentModel = mongoose.model("comment", commentSchema);

export default commentModel;
