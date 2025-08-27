import express from "express";
import User from "../models/User.js";
import { jwtAuthMiddleware, generateToken } from "../middlewares/jwt.js";
const router = express.Router();

import { registerUser, loginUser, profile, getAllUsers } from "../controllers/userController.js";


// registeration router
router.post("/register", registerUser);
// login user
router.post("/login", loginUser);
// own profile
router.get("/me", jwtAuthMiddleware, profile);
// see all the users
router.get("/users", jwtAuthMiddleware, getAllUsers);

export default router;