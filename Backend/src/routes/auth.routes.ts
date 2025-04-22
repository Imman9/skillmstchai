import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { validateLogin, validateRegister } from "../middleware/validation";
import { authenticate } from "../middleware/auth";

const router = Router();
const authController = new AuthController();

// Public routes
router.post("/login", validateLogin, authController.login);
router.post("/register", validateRegister, authController.signup);

// Protected routes
router.post("/logout", authenticate, authController.logout);
router.get("/profile", authenticate, authController.getProfile);
router.put("/profile", authenticate, authController.updateProfile);
router.post("/change-password", authenticate, authController.changePassword);
router.post("/refresh-token", authenticate, authController.refreshToken);

// Commented out for future implementation
// router.post("/forgot-password", validateEmail, authController.forgotPassword);
// router.post("/reset-password", validateResetToken, authController.resetPassword);

export const authRoutes = router;
