import { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/auth.service";
import { AppError } from "../middleware/errorHandler";
import { User } from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserRole } from "../models/user-role.enum";
import { sequelize } from "../config/database";

// Extend express Request to include session
interface AuthRequest extends Request {
  session?: {
    destroy(callback: (err?: Error) => void): void;
  };
}

const VALID_ROLES = ['job_seeker', 'employer', 'admin'] as const;
type UserRole = typeof VALID_ROLES[number];

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
    // Bind methods to ensure correct 'this' context
    this.login = this.login.bind(this);
    this.signup = this.signup.bind(this);
    this.logout = this.logout.bind(this);
    this.getProfile = this.getProfile.bind(this);
    this.updateProfile = this.updateProfile.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.refreshToken = this.refreshToken.bind(this);
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        throw new AppError("Email and password are required", 400);
      }

      const { user, token } = await this.authService.login(email, password);

      res.status(200).json({
        status: "success",
        data: {
          user: {
            id: user.id,
            email: user.email,
            role: user.role,
            firstName: user.firstName,
            lastName: user.lastName,
          },
          token,
        }
      });
    } catch (error) {
      next(error);
    }
  }

  async signup(req: Request, res: Response, next: NextFunction) {
    const { email, password, role, firstName, lastName } = req.body;

    try {
      // Check if user already exists
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({
          status: "error",
          message: "User with this email already exists",
        });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create user
      const user = await User.create({
        email,
        password: hashedPassword,
        role: role || UserRole.JOB_SEEKER,
        firstName,
        lastName,
        isActive: true,
        status: "active",
      });

      // Generate tokens
      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET || "your-secret-key",
        { expiresIn: "1h" }
      );

      const refreshToken = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_REFRESH_SECRET || "your-refresh-secret-key",
        { expiresIn: "7d" }
      );

      // Return success response
      return res.status(201).json({
        status: "success",
        data: {
          token,
          refreshToken,
          user: {
            id: user.id,
            email: user.email,
            role: user.role,
            firstName: user.firstName,
            lastName: user.lastName,
            isActive: user.isActive,
            status: user.status,
          },
        },
      });
    } catch (error) {
      console.error("Signup error:", error);
      return res.status(500).json({
        status: "error",
        message: "An error occurred during signup",
      });
    }
  }

  async logout(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      // Clear any session data if exists
      req.session?.destroy((err: Error | undefined) => {
        if (err) {
          next(new AppError("Error logging out", 500));
          return;
        }
      });

      res.status(200).json({
        status: "success",
        message: "Logged out successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  async getProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.id;
      if (!userId) {
        throw new AppError("User not authenticated", 401);
      }

      const user = await this.authService.getProfile(userId);
      
      res.status(200).json({
        status: "success",
        data: {
          user: {
            id: user.id,
            email: user.email,
            role: user.role,
            firstName: user.firstName,
            lastName: user.lastName,
            isActive: user.isActive,
            status: user.status,
            lastLogin: user.lastLogin,
          }
        }
      });
    } catch (error) {
      next(error);
    }
  }

  async updateProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.id;
      if (!userId) {
        throw new AppError("User not authenticated", 401);
      }

      const { firstName, lastName, email } = req.body;
      const updatedUser = await this.authService.updateProfile(userId, {
        firstName,
        lastName,
        email,
      });

      res.status(200).json({
        status: "success",
        data: {
          user: {
            id: updatedUser.id,
            email: updatedUser.email,
            role: updatedUser.role,
            firstName: updatedUser.firstName,
            lastName: updatedUser.lastName,
          }
        }
      });
    } catch (error) {
      next(error);
    }
  }

  async changePassword(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.id;
      if (!userId) {
        throw new AppError("User not authenticated", 401);
      }

      const { currentPassword, newPassword } = req.body;
      if (!currentPassword || !newPassword) {
        throw new AppError("Current password and new password are required", 400);
      }

      await this.authService.changePassword(userId, currentPassword, newPassword);

      res.status(200).json({
        status: "success",
        message: "Password updated successfully"
      });
    } catch (error) {
      next(error);
    }
  }

  async refreshToken(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.id;
      if (!userId) {
        throw new AppError("User not authenticated", 401);
      }

      const token = await this.authService.refreshToken(userId);

      res.status(200).json({
        status: "success",
        data: { token }
      });
    } catch (error) {
      next(error);
    }
  }
}
