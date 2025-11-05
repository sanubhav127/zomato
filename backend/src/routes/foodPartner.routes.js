import { Router } from "express";
import multer from "multer";
import { getPartnerById, getProfile, login, logout, signup, updateProfilePicture } from "../controllers/foodPartner.controller.js";
import { checkAuthPartner } from "../middleware/checkAuth.js";
const router = Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", checkAuthPartner, logout);
router.get("/profile", checkAuthPartner, getProfile);
router.get("/:id", getPartnerById);
router.put("/:id/updateProfilePicture", upload.single("profilePicture"), updateProfilePicture);

export default router;