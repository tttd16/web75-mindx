import mongoose from "mongoose";

const { Schema } = mongoose;

const postSchema = new Schema({
  content: { type: String, require: true },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: "User",
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

const postModel = mongoose.model("Post", postSchema);

export default postModel;
