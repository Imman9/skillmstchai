import { Model, DataTypes, Optional, Sequelize } from 'sequelize';
import { sequelize } from '../config/database';

interface PortfolioProjectAttributes {
    id: number;
    jobSeekerId: number;
    title: string;
    description?: string;
    skillsUsed: number[];
    projectUrl?: string;
    startDate?: Date;
    endDate?: Date;
    isFeatured: boolean;
    thumbnailUrl?: string;
    visibility: string;
    createdAt: Date;
    updatedAt: Date;
}

interface PortfolioProjectCreationAttributes extends Optional<PortfolioProjectAttributes, 'id'> {}

export class PortfolioProject extends Model<PortfolioProjectAttributes, PortfolioProjectCreationAttributes> {
    declare id: number;
    declare jobSeekerId: number;
    declare title: string;
    declare description?: string;
    declare skillsUsed: number[];
    declare projectUrl?: string;
    declare startDate?: Date;
    declare endDate?: Date;
    declare isFeatured: boolean;
    declare thumbnailUrl?: string;
    declare visibility: string;
    declare createdAt: Date;
    declare updatedAt: Date;

    public static initialize(sequelize: Sequelize) {
        PortfolioProject.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true,
                },
                jobSeekerId: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    references: {
                        model: 'job_seeker_profiles',
                        key: 'id',
                    },
                    field: 'job_seeker_id',
                },
                title: {
                    type: DataTypes.STRING(255),
                    allowNull: false,
                },
                description: {
                    type: DataTypes.TEXT,
                    allowNull: true,
                },
                skillsUsed: {
                    type: DataTypes.ARRAY(DataTypes.INTEGER),
                    allowNull: false,
                    defaultValue: [],
                    field: 'skills_used',
                },
                projectUrl: {
                    type: DataTypes.STRING(255),
                    allowNull: true,
                    field: 'project_url',
                },
                startDate: {
                    type: DataTypes.DATEONLY,
                    allowNull: true,
                    field: 'start_date',
                },
                endDate: {
                    type: DataTypes.DATEONLY,
                    allowNull: true,
                    field: 'end_date',
                },
                isFeatured: {
                    type: DataTypes.BOOLEAN,
                    allowNull: false,
                    defaultValue: false,
                    field: 'is_featured',
                },
                thumbnailUrl: {
                    type: DataTypes.STRING(255),
                    allowNull: true,
                    field: 'thumbnail_url',
                },
                visibility: {
                    type: DataTypes.STRING(50),
                    allowNull: false,
                    defaultValue: 'public',
                    field: 'visibility',
                },
                createdAt: {
                    type: DataTypes.DATE,
                    allowNull: false,
                    defaultValue: DataTypes.NOW,
                    field: 'created_at',
                },
                updatedAt: {
                    type: DataTypes.DATE,
                    allowNull: false,
                    defaultValue: DataTypes.NOW,
                    field: 'updated_at',
                },
            },
            {
                sequelize,
                modelName: 'PortfolioProject',
                tableName: 'portfolio_projects',
                timestamps: true,
            }
        );
    }

    public static associate(models: any) {
        PortfolioProject.belongsTo(models.JobSeekerProfile, {
            foreignKey: 'jobSeekerId',
            as: 'jobSeeker',
        });
        PortfolioProject.belongsToMany(models.Skill, {
            through: 'portfolio_project_skills',
            foreignKey: 'project_id',
            otherKey: 'skill_id',
            as: 'skills',
        });
    }
} 