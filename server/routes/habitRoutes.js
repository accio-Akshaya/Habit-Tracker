import express from "express";
import { createHabit,markComplete,getHabits, deleteHabit, updateHabit } from "../controllers/habitController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/",protect,createHabit);
router.post("/:id/complete",protect,markComplete);
router.get("/",protect,getHabits);
router.delete("/:id",protect,deleteHabit);
router.put("/:id", protect, updateHabit);
export default router;