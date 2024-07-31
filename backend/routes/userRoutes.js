import { Router } from "express";
import {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  register,
  login,
  logoutUser,
} from "../controllers/userController.js";
import { verifyAdmin, isAuthenticated } from "../middleware/authMiddleware.js";

const router = Router();

router.route("/").get(getUsers);
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logoutUser);

router
  .route("/:id", verifyAdmin)
  .get(isAuthenticated, getUser)
  .put(isAuthenticated, updateUser)
  .delete(isAuthenticated, deleteUser);

export default router;
