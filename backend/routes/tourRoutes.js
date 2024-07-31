import { Router } from "express";
import {
  createTour,
  deleteTour,
  getTour,
  getTours,
  getTourBySearch,
  updateTour,
  getFeaturedTours,
  getTourCount,
} from "../controllers/tourController.js";
import { verifyAdmin } from "../middleware/authMiddleware.js";

const router = Router();

router.route("/").get(getTours).post(verifyAdmin, createTour);
// Tour by search
router.get("/search", getTourBySearch);
router.get("/featured", getFeaturedTours);
router.get("/count", getTourCount);
router
  .route("/:id")
  .get(getTour)
  .put(verifyAdmin, updateTour)
  .delete(verifyAdmin, deleteTour);

export default router;
