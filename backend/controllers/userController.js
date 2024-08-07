import User from "../models/userModel.js";
import asyncHandler from "../middleware/asyncHandler.js";
import generateToken from "../utils/generateToken.js";

export const register = asyncHandler(async (req, res) => {
  const { username, email, photo, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    username,
    email,
    photo,
    password,
  });

  // checking if there's user
  if (!user) {
    res.status(400);
    throw new Error("Invalid user data");
  }

  res.status(200).json({
    _id: user._id,
    name: user.username,
    email: user.email,
    role: user.role,
  });

  // res.status(200).json({ user, message: "User registered successfully" });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // check if email and password does not exists
  if (!email || !password) {
    throw new Error("Please provide email and password", 401);
  }

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    const { password, ...rest } = user._doc;

    generateToken(res, user._id);

    res.json({
      ...rest,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

export const logoutUser = (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully" });
};

export const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const updateTour = await Tour.findByIdAndUpdate(
    id,
    { $set: req.body },
    { new: true }
  );

  res.status(200).json({ updateUser, message: "Updated successfully" });
});

export const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  await User.findByIdAndDelete(id);

  res.status(200).json("User deleted successfully");
});

export const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});

  if (!users) throw new Error("No user found!");

  res.status(200).json(users);
});

export const getUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id);

  if (!user) throw new Error("No User found!");

  res.status(200).json(user);
});
