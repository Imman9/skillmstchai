import { Router } from "express";
import { CVController } from "../controllers/cv-controller";
import { authenticate } from "../middleware/auth";



const cvController = new CVController();
const router = Router();

// Protected routes - require authentication


// Get all CVs for a job seeker
router.get("/job-seeker/:jobSeekerId", authenticate,cvController.getUserCVs);

// Get a specific CV
router.get("/:id", authenticate,cvController.getCVById);

// Create a new CV
router.post("/", authenticate,cvController.createCV);

// Update a CV
router.put("/:id", authenticate,cvController.updateCV);

// Delete a CV
router.delete("/:id", authenticate,cvController.deleteCV);

// Set a CV as default
router.patch("/:id/set-default", authenticate,cvController.setDefaultCV);

// Public route - no auth required - to view public CVs
router.get("/public/:id", cvController.getPublicCV);

export const cvRoutes = router;