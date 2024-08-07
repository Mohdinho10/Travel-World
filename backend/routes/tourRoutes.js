import { Router } from "express";
import multer from "multer";
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

/* Configuration Multer for File Upload */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads"); // Store uploaded files in the 'uploads' folder
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use the original file name
  },
});

const upload = multer({ storage });

router
  .route("/")
  .get(getTours)
  .post(verifyAdmin, upload.single("photo"), createTour);
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
