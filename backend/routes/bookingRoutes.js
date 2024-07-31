import { Router } from "express";

import { isAuthenticated, verifyAdmin } from "../middleware/authMiddleware.js";
import {
  createBooking,
  getBooking,
  getBookings,
} from "../controllers/bookingController.js";

const router = Router();

router.post("/", isAuthenticated, createBooking);
router.get("/:id", isAuthenticated, getBooking);
router.get("/", verifyAdmin, getBookings);

export default router;
