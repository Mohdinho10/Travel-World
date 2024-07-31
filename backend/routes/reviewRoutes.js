import { Router } from "express";
import { createReview } from "../controllers/reviewController.js";
import { isAuthenticated } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/:tourId", isAuthenticated, createReview);

export default router;
