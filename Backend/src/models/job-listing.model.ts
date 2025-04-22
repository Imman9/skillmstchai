import { Model, DataTypes, Optional, Sequelize } from 'sequelize';
import { sequelize } from '../config/database';
import { User } from './User';
import { Application } from './application.model';
import { Models } from '../types/models';
import { EmployerProfile } from './employer-profile.model';

export enum RemoteType {
    NONE = 'none',
    FULLY_REMOTE = 'fully_remote',
    HYBRID = 'hybrid',
    FLEXIBLE = 'flexible'
}

interface JobListingAttributes {
    id: number;
    employerId: number;
    categoryId?: number;
    title: string;
    description: string;
    requirements?: string;
    responsibilities?: string;
    benefits?: string;
    location?: string;
    jobType?: string;
    experienceLevel?: string;
    educationLevel?: string;
    salaryMin?: number;
    salaryMax?: number;
    salaryCurrency: string;
    salaryPeriod?: string;
    remoteType: RemoteType;
    postedDate: Date;
    deadlineDate?: Date;
    status: string;
    viewsCount: number;
    applicationsCount: number;
    isFeatured: boolean;
    department?: string;
    employmentType?: string;
    workSchedule?: string;
    skillMatchThreshold?: number;
    deletedAt?: Date;
    hiringManagerId?: number;
    
    employer?: User;
    hiringManager?: User;
    applications?: Application[];
}

interface JobListingCreationAttributes extends Optional<JobListingAttributes, 'id' | 'viewsCount' | 'applicationsCount' | 'isFeatured' | 'status' | 'salaryCurrency' | 'remoteType' | 'postedDate'> {}

export class JobListing extends Model<JobListingAttributes, JobListingCreationAttributes> {
    declare id: number;
    declare employerId: number;
    declare categoryId?: number;
    declare title: string;
    declare description: string;
    declare requirements?: string;
    declare responsibilities?: string;
    declare benefits?: string;
    declare location?: string;
    declare jobType?: string;
    declare experienceLevel?: string;
    declare educationLevel?: string;
    declare salaryMin?: number;
    declare salaryMax?: number;
    declare salaryCurrency: string;
    declare salaryPeriod?: string;
    declare remoteType: RemoteType;
    declare postedDate: Date;
    declare deadlineDate?: Date;
    declare status: string;
    declare viewsCount: number;
    declare applicationsCount: number;
    declare isFeatured: boolean;
    declare department?: string;
    declare employmentType?: string;
    declare workSchedule?: string;
    declare skillMatchThreshold?: number;
    declare deletedAt?: Date;
    declare hiringManagerId?: number;
    
    
    // Association properties
    declare employerProfile?: EmployerProfile;
    declare hiringManager?: User;
    declare applications?: Application[];

    public static initialize(sequelize: Sequelize) {
        JobListing.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true,
                },
                employerId: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    field: "employer_id",
                },
                categoryId: {
                    type: DataTypes.INTEGER,
                    allowNull: true,
                    field: "category_id",
                },
                title: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                description: {
                    type: DataTypes.TEXT,
                    allowNull: false,
                },
                requirements: {
                    type: DataTypes.TEXT,
                    allowNull: true,
                },
                responsibilities: {
                    type: DataTypes.TEXT,
                    allowNull: true,
                },
                benefits: {
                    type: DataTypes.TEXT,
                    allowNull: true,
                },
                location: {
                    type: DataTypes.STRING,
                    allowNull: true,
                },
                jobType: {
                    type: DataTypes.STRING,
                    allowNull: true,
                    field: "job_type",
                },
                experienceLevel: {
                    type: DataTypes.STRING,
                    allowNull: true,
                    field: "experience_level",
                },
                educationLevel: {
                    type: DataTypes.STRING,
                    allowNull: true,
                    field: "education_level",
                },
                salaryMin: {
                    type: DataTypes.DECIMAL(10, 2),
                    allowNull: true,
                    field: "salary_min",
                },
                salaryMax: {
                    type: DataTypes.DECIMAL(10, 2),
                    allowNull: true,
                    field: "salary_max",
                },
                salaryCurrency: {
                    type: DataTypes.STRING,
                    defaultValue: 'USD',
                    allowNull: false,
                    field: "salary_currency",
                },
                salaryPeriod: {
                    type: DataTypes.STRING,
                    allowNull: true,
                    field: "salary_period",
                },
                remoteType: {
                    type: DataTypes.ENUM(...Object.values(RemoteType)),
                    defaultValue: RemoteType.NONE,
                    allowNull: false,
                    field: "remote_type",
                },
                postedDate: {
                    type: DataTypes.DATE,
                    defaultValue: DataTypes.NOW,
                    allowNull: false,
                    field: "posted_date",
                },
                deadlineDate: {
                    type: DataTypes.DATE,
                    allowNull: true,
                    field: "deadline_date",
                },
                status: {
                    type: DataTypes.STRING,
                    defaultValue: 'active',
                    allowNull: false,
                },
                viewsCount: {
                    type: DataTypes.INTEGER,
                    defaultValue: 0,
                    allowNull: false,
                    field: "views_count",
                },
                applicationsCount: {
                    type: DataTypes.INTEGER,
                    defaultValue: 0,
                    allowNull: false,
                    field: "application_count",
                },
                isFeatured: {
                    type: DataTypes.BOOLEAN,
                    defaultValue: false,
                    allowNull: false,
                    field: "is_featured",
                },
                department: {
                    type: DataTypes.STRING,
                    allowNull: true,
                },
                employmentType: {
                    type: DataTypes.STRING,
                    allowNull: true,
                    field: "employment_type",
                },
                workSchedule: {
                    type: DataTypes.STRING,
                    allowNull: true,
                    field: "work_schedule",
                },
                skillMatchThreshold: {
                    type: DataTypes.DECIMAL(5, 2),
                    allowNull: true,
                    field: "skill_match_threshold",
                },
                deletedAt: {
                    type: DataTypes.DATE,
                    allowNull: true,
                    field: "deleted_at",
                },
                hiringManagerId: {
                    type: DataTypes.INTEGER,
                    allowNull: true,
                    field: "hiring_manager_id",
                },
               
            },
            {
                sequelize,
                modelName: 'JobListing',
                tableName: 'job_listings',
                paranoid: true,
            }
        );
        return JobListing;
    }

    public static associate(models: Models) {
        JobListing.belongsTo(models.User, {
            foreignKey: 'employerId',
            as: 'employer',
        });
        JobListing.belongsTo(models.User, {
            foreignKey: 'hiringManagerId',
            as: 'hiringManager',
        });
        JobListing.hasMany(models.Application, {
            foreignKey: 'jobId',
            as: 'applications',
        });
    }
} 