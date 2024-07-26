import express from "express";
import { addCar, deleteCar, getGarage } from "../controllers/garage.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/", verifyToken, getGarage);
router.post("/add", verifyToken, addCar);
router.delete("/delete/:id", verifyToken, deleteCar);

export default router;
