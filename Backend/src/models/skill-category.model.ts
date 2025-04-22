// models/SkillCategory.ts
import { Model, DataTypes, Optional, Sequelize } from 'sequelize';
import { sequelize } from '../config/database';

interface SkillCategoryAttributes {
    id: number;
    name: string;
    description?: string;
    parentCategoryId?: number;
    isActive: boolean;
    industryRelevance?: any;
   
}

interface SkillCategoryCreationAttributes extends Optional<SkillCategoryAttributes, 'id'> {}

export class SkillCategory extends Model<SkillCategoryAttributes, SkillCategoryCreationAttributes> {
    declare id: number;
    declare name: string;
    declare description?: string;
    declare parentCategoryId?: number;
    declare isActive: boolean;
    declare industryRelevance?: any;
   

    public static initialize(sequelize: Sequelize) {
        SkillCategory.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true,
                },
                name: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    unique: true,
                },
                description: {
                    type: DataTypes.TEXT,
                    allowNull: true,
                },
                parentCategoryId: {
                    type: DataTypes.INTEGER,
                    allowNull: true,
                    field: "parent_category_id",
                },
                isActive: {
                    type: DataTypes.BOOLEAN,
                    defaultValue: true,
                    allowNull: false,
                    field: "is_active",
                },
                industryRelevance: {
                    type: DataTypes.JSONB,
                    allowNull: true,
                    field: "industry_revelance",
                },
               
            },
            {
                sequelize,
                modelName: 'SkillCategory',
                tableName: 'skill_categories',
            }
        );
        return SkillCategory;
    }

    public static associate(models: any) {
        SkillCategory.hasMany(models.Skill, {
            foreignKey: 'categoryId',
            as: 'skills',
        });
        SkillCategory.belongsTo(models.SkillCategory, {
            foreignKey: 'parentCategoryId',
            as: 'parentCategory',
        });
        SkillCategory.hasMany(models.SkillCategory, {
            foreignKey: 'parentCategoryId',
            as: 'subCategories',
        });
    }
}
