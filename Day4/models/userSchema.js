import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
  userName: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const userModel = mongoose.model("user", userSchema);

export default userModel;
