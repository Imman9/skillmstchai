import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { authenticate } from "../middleware/auth";
import { validateProfileUpdate, validatePasswordUpdate } from "../middleware/validation";

const router = Router();
const userController = new UserController();

// All routes require authentication
router.use(authenticate);

// Profile routes
router.get("/profile", userController.getProfile);
router.put("/profile", validateProfileUpdate, userController.updateProfile);
router.put("/password", validatePasswordUpdate, userController.updatePassword);

// Account management routes
router.delete("/account", userController.deleteAccount);

// Internal routes (not exposed in API documentation)
router.patch("/last-login", userController.updateLastLogin);

export const userRoutes = router;
