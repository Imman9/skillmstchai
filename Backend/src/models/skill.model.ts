import { Model, DataTypes, Optional, Sequelize } from 'sequelize';
import { sequelize } from '../config/database';
import { SkillCategory } from './skill-category.model';

interface SkillAttributes {
    id: number;
    name: string;
    categoryId?: number;
    description?: string;
    isTechnical: boolean;
    isVerified: boolean;
    status: string;
    demandLevel?: number;
    createdAt: Date;
    updatedAt: Date;
}

interface SkillCreationAttributes extends Optional<SkillAttributes, 'id'> {}

export class Skill extends Model<SkillAttributes, SkillCreationAttributes> {
    declare id: number;
    declare name: string;
    declare categoryId?: number;
    declare description?: string;
    declare isTechnical: boolean;
    declare isVerified: boolean;
    declare status: string;
    declare demandLevel?: number;
    declare createdAt: Date;
    declare updatedAt: Date;

    public static initialize(sequelize: Sequelize) {
        Skill.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true,
                },
                name: {
                    type: DataTypes.STRING(100),
                    allowNull: false,
                    unique: true,
                },
                categoryId: {
                    type: DataTypes.INTEGER,
                    allowNull: true,
                    references: {
                        model: 'skill_categories',
                        key: 'id',
                    },
                    field: "category_id",
                },
                description: {
                    type: DataTypes.TEXT,
                    allowNull: true,
                },
                isTechnical: {
                    type: DataTypes.BOOLEAN,
                    allowNull: false,
                    defaultValue: false,
                    field: 'is_technical',
                },
                isVerified: {
                    type: DataTypes.BOOLEAN,
                    allowNull: false,
                    defaultValue: false,
                    field: 'is_verified',
                },
                status: {
                    type: DataTypes.STRING(50),
                    allowNull: false,
                    defaultValue: 'active',
                },
                demandLevel: {
                    type: DataTypes.INTEGER,
                    allowNull: true,
                    validate: {
                        min: 1,
                        max: 5,
                    },
                    field: 'demand_level',
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
                modelName: 'Skill',
                tableName: 'skills',
                timestamps: true,
            }
        );
        return Skill;
    }

    public static associate(models: any) {
        Skill.belongsTo(SkillCategory, {
            foreignKey: 'categoryId',
            as: 'category',
        });
    }
} 