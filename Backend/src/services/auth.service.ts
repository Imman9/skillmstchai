import { models } from "../models";
import { UserRole, UserAttributes, UserCreationAttributes } from "../models/User";
import { UserService } from "./user.service";
import { AppError } from "../middleware/errorHandler";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const { User } = models;

export class AuthService {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async login(email: string, password: string) {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new AppError("Invalid credentials", 401);
    }

    if (!user.isActive) {
      throw new AppError("Account is inactive", 403);
    }

    const isPasswordValid = await user.checkPassword(password);
    if (!isPasswordValid) {
      throw new AppError("Invalid credentials", 401);
    }

    await this.userService.updateLastLogin(user.id);

    const token = this.generateToken(user);
    return { user, token };
  }

  async signup(userData: {
    email: string;
    password: string;
    role: UserRole;
    firstName?: string;
    lastName?: string;
  }) {
    const existingUser = await User.findOne({
      where: { email: userData.email },
    });
    if (existingUser) {
      throw new AppError("Email already in use", 400);
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = await User.create({
      email: userData.email,
      passwordHash: hashedPassword,
      role: userData.role,
      firstName: userData.firstName,
      lastName: userData.lastName,
      status: "active",
      isActive: true,
    } as UserCreationAttributes);

    const token = this.generateToken(user);
    return { user, token };
  }

  async getProfile(userId: number) {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new AppError("User not found", 404);
    }
    return user;
  }

  async updateProfile(userId: number, updateData: {
    firstName?: string;
    lastName?: string;
    email?: string;
  }) {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new AppError("User not found", 404);
    }

    if (updateData.email && updateData.email !== user.email) {
      const existingUser = await User.findOne({
        where: { email: updateData.email }
      });
      if (existingUser) {
        throw new AppError("Email already in use", 400);
      }
    }

    await user.update(updateData);
    return user;
  }

  async changePassword(userId: number, currentPassword: string, newPassword: string) {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new AppError("User not found", 404);
    }

    const isPasswordValid = await user.checkPassword(currentPassword);
    if (!isPasswordValid) {
      throw new AppError("Current password is incorrect", 400);
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await user.update({ passwordHash: hashedPassword });
  }

  async refreshToken(userId: number) {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new AppError("User not found", 404);
    }

    return this.generateToken(user);
  }

  private generateToken(user: UserAttributes): string {
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new AppError("JWT secret is not configured", 500);
    }

    const options: jwt.SignOptions = {
      expiresIn: parseInt(process.env.JWT_EXPIRES_IN || "7d"),
    };

    return jwt.sign(payload, secret, options as jwt.SignOptions);
  }
}
