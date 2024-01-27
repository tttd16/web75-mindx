import mongoose from "mongoose";
const { Schema } = mongoose;

const postSchema = new Schema(
  {
    content: { type: String, required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const postModel = mongoose.model("Post", postSchema);

export default postModel;
