// src/types/express.d.ts
import { Request as ExpressRequest } from 'express';
import { UserRole, UserStatus, UserAttributes } from '../models/User';

declare module 'express-serve-static-core' {
  interface User extends Omit<UserAttributes, 'passwordHash'> {
    // Add any additional properties needed for the Express User type
  }

  interface Request {
    user?: User;
  }
}
