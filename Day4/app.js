import express from "express";
import dotenv from "dotenv";

import connectDB from "./config/database.js";
import postRoute from "./route/postRoute.js";
import userRoute from "./route/userRoute.js";
import commentRoute from "./route/commentRoute.js";

dotenv.config();
connectDB();
const app = express();
app.use(express.json());
app.listen(process.env.PORT, () => {
  console.log(`Connect port ${process.env.PORT}`);
});

app.use("/user", userRoute);
app.use("/posts", postRoute);
app.use("/comments", commentRoute);
