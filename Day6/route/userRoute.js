import express from "express";
import { validateRegister } from "../middleware/validate.js";
import { register, getAllUser } from "../controller/userController.js";
import { isAdmin, protect } from "../middleware/authMiddleware.js";

const userRoute = express.Router();

userRoute.get("/admin", protect, isAdmin, getAllUser);
userRoute.post("/register", validateRegister, register);

export default userRoute;
