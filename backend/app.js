import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { notFound, errorHandler } from "./middleware/ErrorMiddleware.js";
import tourRoutes from "./routes/tourRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";

dotenv.config();

const app = express();

const port = process.env.PORT;

// middleware
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// cookie parser middleware
app.use(cookieParser());
app.use(
  cors({
    origin: "https://travel-world-5ivr.onrender.com" || "http://localhost:5173", // Replace with your frontend URL
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  })
);

app.use("/api/tours", tourRoutes);
app.use("/api/users", userRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/booking", bookingRoutes);

// Serve static files
if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  // app.use(express.static(path.join(__dirname, "frontend", "dist"))); // Serve frontend build
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.use(
    "/uploads",
    express.static(path.join(__dirname, "public", "uploads"))
  ); // Serve uploads

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
  );
} else {
  const __dirname = path.resolve();
  app.use(
    "/uploads",
    express.static(path.join(__dirname, "public", "uploads"))
  ); // Serve uploads in development
}

app.use(notFound);
app.use(errorHandler);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 20000, // Increase timeout to 20 seconds
  })
  .then(() => console.log("mongoose connected successfully"))
  .catch((err) => err);

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
