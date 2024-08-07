import Tour from "../models/tourModel.js";
import asyncHandler from "../middleware/asyncHandler.js";

export const createTour = asyncHandler(async (req, res) => {
  const photo = req.file.path;
  console.log(photo);

  if (!photo) {
    res.status(400);
    throw new Error("No file uploaded");
  }

  const newTour = await Tour.create({ ...req.body, photo });

  // checking if there's tour
  if (!newTour) {
    res.status(400);
    throw new Error("Invalid tour data");
  }

  res.status(200).json({ newTour, message: "Tour created successfully" });
});

export const updateTour = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const updateTour = await Tour.findByIdAndUpdate(
    id,
    { $set: req.body },
    { new: true }
  );

  res.status(200).json({ updateTour, message: "Updated successfully" });
});

export const deleteTour = asyncHandler(async (req, res) => {
  const { id } = req.params;

  await Tour.findByIdAndDelete(id);

  res.status(200).json("Tour deleted successfully");
});

export const getTour = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const tour = await Tour.findById(id).populate("reviews");

  if (!tour) throw new Error("No Tour found!");

  res.status(200).json(tour);
});

export const getTours = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page);

  const tours = await Tour.find({})
    .populate("reviews")
    .skip(page * 8)
    .limit(8);

  if (!tours) throw new Error("No Tour found!");

  res.status(200).json({ tours, count: tours.length });
});

export const getTourBySearch = asyncHandler(async (req, res) => {
  // i means case sensitive
  const city = new RegExp(req.query.city, "i");
  const distance = parseInt(req.query.distance);
  const maxGroupSize = parseInt(req.query.maxGroupSize);

  const tours = await Tour.find({
    city,
    distance: { $gte: distance },
    maxGroupSize: { $gte: maxGroupSize },
  }).populate("reviews");

  if (!tours) throw new Error("No Tour found!");

  res.status(200).json(tours);
});

export const getFeaturedTours = asyncHandler(async (req, res) => {
  const tours = await Tour.find({ featured: true })
    .populate("reviews")
    .limit(8);

  if (!tours) throw new Error("No Tour found!");

  res.status(200).json(tours);
});

export const getTourCount = asyncHandler(async (req, res) => {
  const tourCount = await Tour.estimatedDocumentCount().populate("reviews");

  if (!tourCount) throw new Error("No Tour found!");

  res.status(200).json(tourCount);
});
