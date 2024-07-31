import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import User from "../models/userModel.js";

// Protected routes
export const isAuthenticated = asyncHandler(async (req, res, next) => {
  let token;

  // Read JWT from the 'jwt' cookie
  token = req.cookies.jwt;
  // console.log(token);

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select("-password");

      console.log(req.user);

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

export const verifyAdmin = asyncHandler(async (req, res, next) => {
  isAuthenticated(req, res, next, () => {
    if (req.user.role === "admin") {
      next();
    } else {
      res.status(401);
      throw new Error("Not authorized, you are not an admin");
    }
  });
});
