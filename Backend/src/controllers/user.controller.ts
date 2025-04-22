import { Request, Response, NextFunction } from "express";
import { User, UserRole, UserStatus } from "../models/User";
import { AppError } from "../middleware/errorHandler";
import { UserService } from "../services/user.service";

// Define valid status values
const VALID_STATUSES = ['active', 'inactive', 'suspended'] as const;
type ValidStatus = typeof VALID_STATUSES[number];

interface AuthenticatedRequest extends Omit<Request, 'user'> {
  user?: {
    id: number;
    email: string;
    role: UserRole;
    firstName?: string;
    lastName?: string;
    isActive: boolean;
  };
}

export class UserController {
  constructor(private readonly userService: UserService = new UserService()) {
    // Bind methods to ensure correct 'this' context
    this.getProfile = this.getProfile.bind(this);
    this.updateProfile = this.updateProfile.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    this.deleteAccount = this.deleteAccount.bind(this);
    this.updateLastLogin = this.updateLastLogin.bind(this);
  }

  async getProfile(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      if (!req.user?.id) {
        throw new AppError("User not authenticated", 401);
      }

      const user = await this.userService.getUserById(req.user.id);
      
      res.status(200).json({
        status: "success",
        data: {
          user: {
            id: user.id,
            email: user.email,
            role: user.role,
            firstName: user.firstName,
            lastName: user.lastName,
            status: user.status,
            isActive: user.isActive,
            lastLogin: user.lastLogin,
          },
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async updateProfile(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      if (!req.user?.id) {
        throw new AppError("User not authenticated", 401);
      }

      const { firstName, lastName, status, isActive } = req.body;
      
      // Validate status if provided
      if (status && !VALID_STATUSES.includes(status as ValidStatus)) {
        throw new AppError("Invalid status value", 400);
      }

      const user = await this.userService.updateUser(req.user.id, {
        ...(firstName !== undefined && { firstName }),
        ...(lastName !== undefined && { lastName }),
        ...(status !== undefined && { status: status as ValidStatus }),
        ...(isActive !== undefined && { isActive }),
      });

      res.status(200).json({
        status: "success",
        data: {
          user: {
            id: user.id,
            email: user.email,
            role: user.role,
            firstName: user.firstName,
            lastName: user.lastName,
            status: user.status,
            isActive: user.isActive,
          },
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async updatePassword(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      if (!req.user?.id) {
        throw new AppError("User not authenticated", 401);
      }

      const { currentPassword, newPassword } = req.body;
      
      if (!currentPassword || !newPassword) {
        throw new AppError("Current password and new password are required", 400);
      }

      if (currentPassword === newPassword) {
        throw new AppError("New password must be different from current password", 400);
      }

      await this.userService.updatePassword(req.user.id, currentPassword, newPassword);

      res.status(200).json({
        status: "success",
        message: "Password updated successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteAccount(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      if (!req.user?.id) {
        throw new AppError("User not authenticated", 401);
      }

      await this.userService.deleteUser(req.user.id);

      res.status(200).json({
        status: "success",
        message: "Account deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  async updateLastLogin(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      if (!req.user?.id) {
        throw new AppError("User not authenticated", 401);
      }

      await this.userService.updateLastLogin(req.user.id);

      res.status(200).json({
        status: "success",
        message: "Last login updated successfully",
      });
    } catch (error) {
      next(error);
    }
  }
}
