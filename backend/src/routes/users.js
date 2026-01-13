import express from "express";
import {
  getBookmarks,
  getMyProfile,
  getUserProfile,
  toggleBookmark,
  updateProfile,
} from "../controllers/userController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// Public route
router.get("/profile/:id", getUserProfile);

// Protected routes
router.get("/me", protect, getMyProfile);
router.put("/profile", protect, updateProfile);
router.put("/bookmark/:resourceId", protect, toggleBookmark);
router.get("/bookmarks", protect, getBookmarks);

export default router;
