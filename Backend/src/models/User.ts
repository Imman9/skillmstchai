import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/database";
import bcrypt from "bcrypt";
import { JobSeekerProfile } from "./job-seeker-profile.model";
import { EmployerProfile } from "./employer-profile.model";
import { Application } from "./application.model";

export type UserRole = "job_seeker" | "employer" | "admin";
export type UserStatus = "active" | "inactive" | "suspended";

export interface UserAttributes {
  id: number;
  email: string;
  passwordHash: string;
  role: UserRole;
  firstName: string;
  lastName: string;
  status: UserStatus;
  lastLogin: Date | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserCreationAttributes extends Omit<UserAttributes, "id" | "createdAt" | "updatedAt"> {
  createdAt?: Date;
  updatedAt?: Date;
}

export class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: number;
  public email!: string;
  public passwordHash!: string;
  public role!: UserRole;
  public firstName!: string;
  public lastName!: string;
  public status!: UserStatus;
  public lastLogin!: Date | null;
  public isActive!: boolean;
  public createdAt!: Date;
  public updatedAt!: Date;

  // Association properties
  declare jobSeekerProfile?: JobSeekerProfile;
  declare employerProfile?: EmployerProfile;
  declare referrals?: Application[];

  public async checkPassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.passwordHash);
  }

  public static initialize(sequelize: any) {
    return User.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        email: {
          type: DataTypes.STRING(255),
          allowNull: false,
          unique: true,
          validate: {
            isEmail: true,
          },
        },
        passwordHash: {
          type: DataTypes.STRING(255),
          allowNull: false,
          field: "password_hash",
        },
        role: {
          type: DataTypes.ENUM("job_seeker", "employer", "admin"),
          allowNull: false,
        },
        firstName: {
          type: DataTypes.STRING(100),
          allowNull: true,
          field: "first_name",
        },
        lastName: {
          type: DataTypes.STRING(100),
          allowNull: true,
          field: "last_name",
        },
        status: {
          type: DataTypes.ENUM("active", "inactive", "suspended"),
          allowNull: false,
          defaultValue: "active",
        },
        lastLogin: {
          type: DataTypes.DATE,
          allowNull: true,
          field: "last_login",
        },
        isActive: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: true,
          field: "is_active",
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
          field: "created_at",
        },
        updatedAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
          field: "updated_at",
        },
      },
      {
        sequelize,
        modelName: "User",
        tableName: "users",
        timestamps: true,
        paranoid: false,
      }
    );
  }

  public static associate(models: any) {
    // Associations are defined in associations.ts
  }
}
