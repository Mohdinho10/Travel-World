import Booking from "../models/bookingModel.js";
import asyncHandler from "../middleware/asyncHandler.js";

export const createBooking = asyncHandler(async (req, res) => {
  const newBooking = await Booking.create(req.body);

  // checking if there's Booking
  if (!newBooking) {
    res.status(400);
    throw new Error("Invalid Booking data");
  }

  res.status(200).json({ newBooking, message: "Booking created successfully" });
});

export const getBookings = asyncHandler(async (req, res) => {
  const books = await Booking.find({});

  if (!books) throw new Error("No Booking found!");

  res.status(200).json({ books, message: "Booking created successfully" });
});

export const getBooking = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const book = await Booking.findById(id);

  if (!book) throw new Error("No Booking found!");

  res.status(200).json(book);
});
