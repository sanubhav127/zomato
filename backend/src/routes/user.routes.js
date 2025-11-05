import { Router } from "express";
import { getProfile, login, logout, signup } from "../controllers/user.controller.js";
import { checkAuthUser } from "../middleware/checkAuth.js";
const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/profile", checkAuthUser , getProfile);
router.post("/logout", checkAuthUser , logout);
router.get("/home", checkAuthUser, getProfile);

export default router;