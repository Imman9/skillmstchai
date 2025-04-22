import { Model, DataTypes, Optional, Sequelize } from 'sequelize';
import { sequelize } from '../config/database';
import { User } from './User';
import { JobListing } from './job-listing.model';

interface EmployerProfileAttributes {
    id: number;
    userId: number;
    companyName: string;
    industry?: string;
    companySize?: string;
    companyDescription?: string;
    websiteUrl?: string;
    logoUrl?: string;
    location?: string;
    foundedYear?: number;
    registrationNumber?: string;
    companyType?: string;
    contactEmail?: string;
    hrContactName?: string;
   
}

interface EmployerProfileCreationAttributes extends Optional<EmployerProfileAttributes, 'id'> {}

export class EmployerProfile extends Model<EmployerProfileAttributes, EmployerProfileCreationAttributes> {
    declare id: number;
    declare userId: number;
    declare companyName: string;
    declare industry?: string;
    declare companySize?: string;
    declare companyDescription?: string;
    declare websiteUrl?: string;
    declare logoUrl?: string;
    declare location?: string;
    declare foundedYear?: number;
    declare registrationNumber?: string;
    declare companyType?: string;
    declare contactEmail?: string;
    declare hrContactName?: string;
  

    // Association properties
    declare employerUser?: User;
    declare jobListings?: JobListing[];

    public static initialize(sequelize: Sequelize) {
        EmployerProfile.init(
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
                companyName: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    field: "company_name",
                },
                industry: {
                    type: DataTypes.STRING,
                    allowNull: true,
                },
                companySize: {
                    type: DataTypes.STRING,
                    allowNull: true,
                    field: "company_size",
                },
                companyDescription: {
                    type: DataTypes.TEXT,
                    allowNull: true,
                    field: "company_description",
                },
                websiteUrl: {
                    type: DataTypes.STRING,
                    allowNull: true,
                    field: "website_url",
                },
                logoUrl: {
                    type: DataTypes.STRING,
                    allowNull: true,
                    field: "logo_url",
                },
                location: {
                    type: DataTypes.STRING,
                    allowNull: true,
                },
                foundedYear: {
                    type: DataTypes.INTEGER,
                    allowNull: true,
                    field: "founded_year",
                },
                registrationNumber: {
                    type: DataTypes.STRING,
                    allowNull: true,
                    field: "registeration_number",
                },
                companyType: {
                    type: DataTypes.STRING,
                    allowNull: true,
                    field: "company_type",
                },
                contactEmail: {
                    type: DataTypes.STRING,
                    allowNull: true,
                    field: "contact_email",
                },
                hrContactName: {
                    type: DataTypes.STRING,
                    allowNull: true,
                    field: "hr_contact_name",
                },
              
            },
            {
                sequelize,
                modelName: 'EmployerProfile',
                tableName: 'employer_profiles',
            }
        );
        return EmployerProfile;
    }

    public static associate(models: any) {
        // Associations are defined in associations.ts
    }
} 