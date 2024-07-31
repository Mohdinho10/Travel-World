import Review from "../models/reviewModel.js";
import Tour from "../models/tourModel.js";
import asyncHandler from "../middleware/asyncHandler.js";

export const createReview = asyncHandler(async (req, res) => {
  const tourId = req.params.tourId;
  const newReview = new Review({ ...req.body });

  const savedReview = await newReview.save();

  await Tour.findByIdAndUpdate(tourId, {
    $push: { reviews: savedReview._id },
  });

  res.status(200).json({ message: "Review submitted", data: savedReview });
});
