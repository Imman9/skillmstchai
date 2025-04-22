import { Model, DataTypes, Optional, Sequelize } from 'sequelize';
import { sequelize } from '../config/database';
import { JobListing } from './job-listing.model';
import { User } from './User';
import { Models } from '../types/models';
import { JobSeekerProfile } from './job-seeker-profile.model';

export enum ApplicationStatus {
    PENDING = 'pending',
    REVIEWED = 'reviewed',
    INTERVIEWING = 'interviewing',
    OFFERED = 'offered',
    HIRED = 'hired',
    REJECTED = 'rejected',
    WITHDRAWN = 'withdrawn'
}

export interface ApplicationAttributes {
    id: number;
    jobId: number;
    jobSeekerId: number;
    cvId?: number;
    coverLetter?: string;
    status: ApplicationStatus;
    appliedDate: Date;
    lastUpdated?: Date;
    reviewNotes?: string;
    source?: string;
    referralId?: number;
    matchScore?: number;
    deletedAt?: Date;
   
    job?: JobListing;
    jobSeeker?: User;
}

export interface ApplicationCreationAttributes extends Optional<ApplicationAttributes, 'id' | 'status' | 'appliedDate'> {}

export class Application extends Model<ApplicationAttributes, ApplicationCreationAttributes> {
    declare id: number;
    declare jobId: number;
    declare jobSeekerId: number;
    declare cvId?: number;
    declare coverLetter?: string;
    declare status: ApplicationStatus;
    declare appliedDate: Date;
    declare lastUpdated?: Date;
    declare reviewNotes?: string;
    declare source?: string;
    declare referralId?: number;
    declare matchScore?: number;
    declare deletedAt?: Date;
    
    
    // Association properties
    declare jobListing?: JobListing;
    declare jobSeekerProfile?: JobSeekerProfile;
    declare referral?: User;

    public static initialize(sequelize: Sequelize) {
        Application.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true,
                },
                jobId: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    field: "job_id",
                },
                jobSeekerId: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    field: "job_seeker_id",
                },
                cvId: {
                    type: DataTypes.INTEGER,
                    allowNull: true,
                    field: "cv_id",
                },
                coverLetter: {
                    type: DataTypes.TEXT,
                    allowNull: true,
                    field: "cover_letter",
                },
                status: {
                    type: DataTypes.ENUM(...Object.values(ApplicationStatus)),
                    defaultValue: ApplicationStatus.PENDING,
                    allowNull: false,
                },
                appliedDate: {
                    type: DataTypes.DATE,
                    defaultValue: DataTypes.NOW,
                    allowNull: false,
                    field: "applied_date",
                },
                lastUpdated: {
                    type: DataTypes.DATE,
                    allowNull: true,
                    field: "last_updated",
                },
                reviewNotes: {
                    type: DataTypes.TEXT,
                    allowNull: true,
                    field: "review_notes",
                },
                source: {
                    type: DataTypes.STRING,
                    allowNull: true,
                },
                referralId: {
                    type: DataTypes.INTEGER,
                    allowNull: true,
                    field: "referral_id",
                },
                matchScore: {
                    type: DataTypes.DECIMAL(5, 2),
                    allowNull: true,
                    field: "match_score",
                },
                deletedAt: {
                    type: DataTypes.DATE,
                    allowNull: true,
                    field: "deleted_at",
                    
            
                },
                
               
            },
            {
                sequelize,
                modelName: 'Application',
                tableName: 'applications',
                paranoid: true,
            }
        );
        return Application;
    }

    public static associate(models: Models) {
        Application.belongsTo(models.JobListing, {
            foreignKey: 'jobId',
            as: 'job',
        });
        Application.belongsTo(models.User, {
            foreignKey: 'jobSeekerId',
            as: 'jobSeeker',
        });
    }
} 