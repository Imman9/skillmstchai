// models/jobSeekerSkill.ts

import { Model, DataTypes, Optional, Sequelize } from "sequelize";
import { sequelize } from "../config/database"; // adjust if your sequelize instance is elsewhere
import { Models } from '../types/models';
import { Skill } from './skill.model';
import { JobSeekerProfile } from './job-seeker-profile.model';

interface JobSeekerSkillAttributes {
    id: number;
    jobSeekerId: number;
    skillId: number;
    proficiencyLevel: number;
    isVerified: boolean;
    yearsOfExperience?: number;
    lastUsedDate?: Date;
    verificationDate?: Date;
    verificationMethod?: string;
    isPrimary: boolean;
   
}

interface JobSeekerSkillCreationAttributes extends Optional<JobSeekerSkillAttributes, 'id'> {}

export class JobSeekerSkill extends Model<JobSeekerSkillAttributes, JobSeekerSkillCreationAttributes> {
    declare id: number;
    declare jobSeekerId: number;
    declare skillId: number;
    declare proficiencyLevel: number;
    declare isVerified: boolean;
    declare yearsOfExperience?: number;
    declare lastUsedDate?: Date;
    declare verificationDate?: Date;
    declare verificationMethod?: string;
    declare isPrimary: boolean;
 

    // Association properties
    declare skill?: Skill;
    declare jobSeekerProfile?: JobSeekerProfile;

    public static initialize(sequelize: Sequelize) {
        JobSeekerSkill.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true,
                },
                jobSeekerId: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    field: "job_seeker_id",
                },
                skillId: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    field: "skill_id",
                },
                proficiencyLevel: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    validate: {
                        min: 1,
                        max: 5,
                    },
                    field: "proficiency_level",
                },
                isVerified: {
                    type: DataTypes.BOOLEAN,
                    defaultValue: false,
                    allowNull: false,
                    field: "is_verified",
                },
                yearsOfExperience: {
                    type: DataTypes.DECIMAL(4, 1),
                    allowNull: true,
                    field: "years_of_experience",
                },
                lastUsedDate: {
                    type: DataTypes.DATEONLY,
                    allowNull: true,
                    field: "last_used_date",
                },
                verificationDate: {
                    type: DataTypes.DATE,
                    allowNull: true,
                    field: "verification_date",
                },
                verificationMethod: {
                    type: DataTypes.STRING,
                    allowNull: true,
                    field: "verification_method",
                },
                isPrimary: {
                    type: DataTypes.BOOLEAN,
                    defaultValue: false,
                    allowNull: false,
                    field: "is_primary",
                },
              
            },
            {
                sequelize,
                modelName: "JobSeekerSkill",
                tableName: "job_seeker_skills",
                timestamps: false,
                indexes: [
                    {
                        unique: true,
                        fields: ["jobSeekerId", "skillId"],
                    },

                ],
            }
        );
        return JobSeekerSkill;
    }

    public static associate(models: any) {
        JobSeekerSkill.belongsTo(models.JobSeekerProfile, {
            foreignKey: 'jobSeekerId',
            as: 'jobSeeker',
        });
        JobSeekerSkill.belongsTo(models.Skill, {
            foreignKey: 'skillId',
            as: 'skill',
        });
    }
}