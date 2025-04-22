import { User, UserRole, UserStatus } from "../models/User";
import { AppError } from "../middleware/errorHandler";
import bcrypt from "bcrypt";

export class UserService {
  async getUserById(id: number): Promise<User> {
    if (!id) {
      throw new AppError("User ID is required", 400);
    }
    const user = await User.findByPk(id);
    if (!user) {
      throw new AppError("User not found", 404);
    }
    return user;
  }

  async updateUser(id: number, updateData: Partial<User>): Promise<User> {
    if (!id) {
      throw new AppError("User ID is required", 400);
    }
    const user = await this.getUserById(id);
    await user.update(updateData);
    return user;
  }

  async updatePassword(
    id: number,
    currentPassword: string,
    newPassword: string
  ): Promise<void> {
    if (!id) {
      throw new AppError("User ID is required", 400);
    }
    const user = await this.getUserById(id);

    const isPasswordValid = await user.checkPassword(currentPassword);
    if (!isPasswordValid) {
      throw new AppError("Current password is incorrect", 401);
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await user.update({ passwordHash: hashedPassword });
  }

  async deleteUser(id: number): Promise<void> {
    if (!id) {
      throw new AppError("User ID is required", 400);
    }
    const user = await this.getUserById(id);
    await user.destroy();
  }

  async updateLastLogin(id: number): Promise<void> {
    if (!id) {
      throw new AppError("User ID is required", 400);
    }
    const user = await this.getUserById(id);
    await user.update({ lastLogin: new Date() });
  }

  async createUser(userData: {
    email: string;
    password: string;
    role: UserRole;
    firstName?: string;
    lastName?: string;
  }): Promise<User> {
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const user = await User.create({
      email: userData.email,
      passwordHash: hashedPassword,
      role: userData.role,
      status: "active" as UserStatus,
      isActive: true,
      firstName: userData.firstName || "",
      lastName: userData.lastName || "",
    });

    return user;
  }

  async changeUserStatus(id: number, status: UserStatus): Promise<User> {
    if (!id) {
      throw new AppError("User ID is required", 400);
    }
    const user = await this.getUserById(id);
    await user.update({ status });
    return user;
  }

  async toggleUserActiveStatus(id: number): Promise<User> {
    if (!id) {
      throw new AppError("User ID is required", 400);
    }
    const user = await this.getUserById(id);
    await user.update({ isActive: !user.isActive });
    return user;
  }
}
