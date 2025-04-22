import { Sequelize } from "sequelize";
import { User } from "./User";
import { JobSeekerProfile } from "./job-seeker-profile.model";
import { EmployerProfile } from "./employer-profile.model";
import { Application } from "./application.model";
import { JobListing } from "./job-listing.model";
import { Skill } from "./skill.model";
import { SkillCategory } from "./skill-category.model";
import { JobSeekerSkill } from "./job-seeker-skills";
import { Models } from "../types/models";

const sequelize = new Sequelize({
  dialect: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "5432"),
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
  database: process.env.DB_NAME || "skillsmatchai",
});

// Initialize models in dependency order
const models = {
  // Base models
  User: User.initialize(sequelize),
  SkillCategory: SkillCategory.initialize(sequelize),
  Skill: Skill.initialize(sequelize),
  
  // Dependent models
  JobSeekerProfile: JobSeekerProfile.initialize(sequelize),
  EmployerProfile: EmployerProfile.initialize(sequelize),
  JobListing: JobListing.initialize(sequelize),
  
  // Association models
  JobSeekerSkill: JobSeekerSkill.initialize(sequelize),
  Application: Application.initialize(sequelize),
} as Models;

// Set up associations
Object.values(models).forEach((model: any) => {
  if (typeof model.associate === "function") {
    model.associate(models);
  }
});

export { sequelize, models };
