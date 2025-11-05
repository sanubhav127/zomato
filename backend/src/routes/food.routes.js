import { Router } from "express";
import { uploadVideo } from "../middleware/uploadVideo.js";
import { addComment, addReels, dislikeReel, getComments, getReels, getReelsByPartner, likeReel } from "../controllers/food.controller.js";
import { checkAuthPartner, checkAuthUser } from "../middleware/checkAuth.js";
const router = Router();

router.post("/addReels", checkAuthPartner, uploadVideo.single("video"), addReels);
router.get("/getReels", checkAuthUser, getReels);
router.get("/:partnerId", checkAuthUser, getReelsByPartner);
router.post("/:id/like", checkAuthUser, likeReel);
router.post("/:id/dislike", checkAuthUser, dislikeReel);
router.post("/:id/comment", checkAuthUser, addComment);
router.get("/:id/comment", checkAuthUser, getComments);

export default router;