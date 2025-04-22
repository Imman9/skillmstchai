import { Model, DataTypes, Optional, Sequelize } from 'sequelize';
import { sequelize } from '../config/database';

interface CVAttributes {
    id: number;
    jobSeekerId: number;
    templateId?: number;
    title: string;
    fileUrl: string;
    isDefault: boolean;
    fileSize?: number;
    fileType?: string;
    version: number;
    language: string;
    isPublic: boolean;
    createdAt: Date;
    lastUpdated: Date;
    deletedAt?: Date;
}

interface CVCreationAttributes extends Optional<CVAttributes, 'id'> {}

export class CV extends Model<CVAttributes, CVCreationAttributes> {
    declare id: number;
    declare jobSeekerId: number;
    declare templateId?: number;
    declare title: string;
    declare fileUrl: string;
    declare isDefault: boolean;
    declare fileSize?: number;
    declare fileType?: string;
    declare version: number;
    declare language: string;
    declare isPublic: boolean;
    declare createdAt: Date;
    declare lastUpdated: Date;
    declare deletedAt?: Date;

    public static initialize(sequelize: Sequelize) {
        CV.init(
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
                templateId: {
                    type: DataTypes.INTEGER,
                    allowNull: true,
                    references: {
                        model: 'cv_templates',
                        key: 'id',
                    },
                    field: 'template_id',
                },
                title: {
                    type: DataTypes.STRING(255),
                    allowNull: false,
                },
                fileUrl: {
                    type: DataTypes.STRING(255),
                    allowNull: false,
                    field: 'file_url',
                },
                isDefault: {
                    type: DataTypes.BOOLEAN,
                    allowNull: false,
                    defaultValue: false,
                    field: 'is_default',
                },
                fileSize: {
                    type: DataTypes.INTEGER,
                    allowNull: true,
                    field: 'file_size',
                },
                fileType: {
                    type: DataTypes.STRING(50),
                    allowNull: true,
                    field: 'file_type',
                },
                version: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    defaultValue: 1,
                },
                language: {
                    type: DataTypes.STRING(50),
                    allowNull: false,
                    defaultValue: 'en',
                },
                isPublic: {
                    type: DataTypes.BOOLEAN,
                    allowNull: false,
                    defaultValue: false,
                    field: 'is_public',
                },
                createdAt: {
                    type: DataTypes.DATE,
                    allowNull: false,
                    defaultValue: DataTypes.NOW,
                    field: 'created_at',
                },
                lastUpdated: {
                    type: DataTypes.DATE,
                    allowNull: false,
                    defaultValue: DataTypes.NOW,
                    field: 'last_updated',
                },
                deletedAt: {
                    type: DataTypes.DATE,
                    allowNull: true,
                    field: 'deleted_at',
                },
            },
            {
                sequelize,
                modelName: 'CV',
                tableName: 'cvs',
                timestamps: true,
                paranoid: true,
            }
        );
    }

    public static associate(models: any) {
        CV.belongsTo(models.JobSeekerProfile, {
            foreignKey: 'jobSeekerId',
            as: 'jobSeeker',
        });
        CV.belongsTo(models.CVTemplate, {
            foreignKey: 'templateId',
            as: 'template',
        });
    }
} 