import { Request as ExpressRequest } from 'express';
import { UserRole, UserStatus } from '../models/User';

export interface AuthUser {
  id: number;
  email: string;
  role: UserRole;
  isActive: boolean;
  firstName: string;
  lastName: string;
  status: UserStatus;
  lastLogin: Date | null;
}

export interface AuthRequest extends ExpressRequest {
  user?: AuthUser;
} 