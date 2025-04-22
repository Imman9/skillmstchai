import { Request, Response, NextFunction } from 'express';
import { AppError } from './errorHandler';
import { UserRole } from '../models/User';

// Extend the base Request type
interface AuthRequest extends Omit<Request, 'user'> {
  user?: {
    id: number;
    email: string;
    role: UserRole;
    firstName?: string;
    lastName?: string;
    isActive: boolean;
  };
}

export const authorize = (allowedRoles: UserRole[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        throw new AppError('Not authenticated', 401);
      }

      if (!allowedRoles.includes(req.user.role)) {
        throw new AppError('Not authorized to access this resource', 403);
      }

      next();
    } catch (error) {
      next(error);
    }
  };
}; 