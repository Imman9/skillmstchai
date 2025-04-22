import { Model, DataTypes, Optional } from "sequelize";
import { sequelize } from "../config/database";
import { Sequelize } from "sequelize";
import { User } from "./User";
import { JobSeekerSkill } from "./job-seeker-skills";
import { Application } from "./application.model";

export type VisibilitySetting = "public" | "private" | "employers_only";

interface JobSeekerProfileAttributes {
    id: number;
    userId: number;
    headline?: string;
    summary?: string;
    phone?: string;
    location?: string;
    yearsOfExperience?: number;
    currentJobTitle?: string;
    preferredJobType?: string;
    preferredLocation?: string;
    linkedinUrl?: string;
    githubUrl?: string;
    portfolioUrl?: string;
    availabilityStatus?: string;
    visibility: VisibilitySetting;
    lastActive?: Date;
    profileCompletionPercentage: number;
    willingToRelocate: boolean;
    openToRemote: boolean;
    desiredSalary?: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface JobSeekerProfileCreationAttributes extends Optional<JobSeekerProfileAttributes, 'id'> {}

export class JobSeekerProfile extends Model<JobSeekerProfileAttributes, JobSeekerProfileCreationAttributes> {
    declare id: number;
    declare userId: number;
    declare headline?: string;
    declare summary?: string;
    declare phone?: string;
    declare location?: string;
    declare yearsOfExperience?: number;
    declare currentJobTitle?: string;
    declare preferredJobType?: string;
    declare preferredLocation?: string;
    declare linkedinUrl?: string;
    declare githubUrl?: string;
    declare portfolioUrl?: string;
    declare availabilityStatus?: string;
    declare visibility: VisibilitySetting;
    declare lastActive?: Date;
    declare profileCompletionPercentage: number;
    declare willingToRelocate: boolean;
    declare openToRemote: boolean;
    declare desiredSalary?: number;
    declare createdAt: Date;
    declare updatedAt: Date;

    // Association properties
    declare jobSeekerUser?: User;
    declare skills?: JobSeekerSkill[];
    declare applications?: Application[];

    public static initialize(sequelize: Sequelize) {
        JobSeekerProfile.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true,
                },
                userId: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    field: "user_id",
                },
                headline: {
                    type: DataTypes.STRING,
                    allowNull: true,
                },
                summary: {
                    type: DataTypes.TEXT,
                    allowNull: true,
                },
                phone: {
                    type: DataTypes.STRING,
                    allowNull: true,
                },
                location: {
                    type: DataTypes.STRING,
                    allowNull: true,
                },
                yearsOfExperience: {
                    type: DataTypes.INTEGER,
                    allowNull: true,
                    field: "years_of_experience",
                },
                currentJobTitle: {
                    type: DataTypes.STRING,
                    allowNull: true,
                    field: "current_job_title",
                },
                preferredJobType: {
                    type: DataTypes.STRING,
                    allowNull: true,
                    field: "preferred_job_type",
                },
                preferredLocation: {
                    type: DataTypes.STRING,
                    allowNull: true,
                    field: "preferred_location",
                },
                linkedinUrl: {
                    type: DataTypes.STRING,
                    allowNull: true,
                    field: "linkedin_url",
                },
                githubUrl: {
                    type: DataTypes.STRING,
                    allowNull: true,
                    field: "github_url",
                },
                portfolioUrl: {
                    type: DataTypes.STRING,
                    allowNull: true,
                    field: "portfolio_url",
                },
                availabilityStatus: {
                    type: DataTypes.STRING,
                    allowNull: true,
                    field: "availability_status",
                },
                visibility: {
                    type: DataTypes.ENUM('public', 'private', 'employers_only'),
                    allowNull: false,
                    defaultValue: 'private',
                },
                lastActive: {
                    type: DataTypes.DATE,
                    allowNull: true,
                    field: "last_active",
                },
                profileCompletionPercentage: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    defaultValue: 0,
                    field: "profile_completion_percentage",
                },
                willingToRelocate: {
                    type: DataTypes.BOOLEAN,
                    allowNull: false,
                    defaultValue: false,
                    field: "willing_to_relocate",
                },
                openToRemote: {
                    type: DataTypes.BOOLEAN,
                    allowNull: false,
                    defaultValue: false,
                    field: "open_to_remote",
                },
                desiredSalary: {
                    type: DataTypes.INTEGER,
                    allowNull: true,
                    field: "desired_salary",
                },
                createdAt: {
                    type: DataTypes.DATE,
                    allowNull: false,
                    field: "created_at",
                },
                updatedAt: {
                    type: DataTypes.DATE,
                    allowNull: false,
                    field: "updated_at",
                },
            },
            {
                sequelize,
                modelName: 'JobSeekerProfile',
                tableName: 'job_seeker_profiles',
            }
        );
        return JobSeekerProfile;
    }

    public static associate(models: any) {
        JobSeekerProfile.belongsTo(models.User, {
            foreignKey: 'userId',
            as: 'user',
        });
    }
}
