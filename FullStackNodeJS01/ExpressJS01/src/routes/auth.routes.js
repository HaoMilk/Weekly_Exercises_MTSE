import { Router } from "express";
import { register, login, forgotPassword, resetPasswordController } from "../controllers/user.controller.js";
import { homepage } from "../controllers/home.controller.js";
import { protect } from "../middleware/auth.js";

const router = Router();

// Auth routes
router.post("/users/register", register);
router.post("/users/login", login);
router.post("/users/forgot-password", forgotPassword);
router.post("/users/reset-password", resetPasswordController);

// Protected route
router.get("/home", protect, homepage);

export default router;
