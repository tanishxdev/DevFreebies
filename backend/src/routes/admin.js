import express from "express";
import {
  approveResource,
  featureResource,
  getPendingResources,
  rejectResource,
  unfeatureResource,
} from "../controllers/adminController.js";
import { admin, protect } from "../middleware/auth.js";

const router = express.Router();

// All admin routes are protected + admin only
router.use(protect);
router.use(admin);

// Admin resource moderation
router.get("/resources/pending", getPendingResources);
router.post("/resources/:id/approve", approveResource);
router.post("/resources/:id/reject", rejectResource);
router.post("/resources/:id/feature", featureResource);
router.post("/resources/:id/unfeature", unfeatureResource);

export default router;
