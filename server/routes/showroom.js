import express from "express";
import { getShowroom, enterContest } from "../controllers/showroom.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/", verifyToken, getShowroom);
router.post("/contest/:carId", verifyToken, enterContest);

export default router;
