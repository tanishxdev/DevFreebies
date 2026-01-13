import express from "express";
import {
  createResource,
  deleteResource,
  getCategories,
  getResource,
  getResources,
  updateResource,
  upvoteResource,
} from "../controllers/resourceController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// Public routes
router.get("/", getResources);
router.get("/categories", getCategories);
router.get("/:id", getResource);

// Protected routes
router.post("/", protect, createResource);
router.put("/:id", protect, updateResource);
router.delete("/:id", protect, deleteResource);
router.put("/:id/upvote", protect, upvoteResource);

export default router;
