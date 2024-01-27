import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";

import connectDB from "./configs/database.js";
import userRoute from "./route/userRoute.js";
import postRoute from "./route/postRoute.js";
import commentRoute from "./route/commentRoute.js";

dotenv.config();
connectDB();
const app = express();
app.use(express.json());
app.use(morgan("dev"));

app.listen(process.env.PORT, () => {
  console.log(`Connect port ${process.env.PORT}`);
});

app.use("/users", userRoute);
app.use("/posts", postRoute);
app.use("/comments", commentRoute);
