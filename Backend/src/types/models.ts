import { Model } from 'sequelize';
import { User } from "../models/User";
import { JobSeekerProfile } from "../models/job-seeker-profile.model";
import { EmployerProfile } from "../models/employer-profile.model";
import { Application } from "../models/application.model";
import { JobListing } from "../models/job-listing.model";
import { Skill } from "../models/skills";
import { SkillCategory } from "../models/skill-category.model";
import { JobSeekerSkill } from "../models/job-seeker-skills";

export interface Models {
    User: ReturnType<typeof User.initialize>;
    JobSeekerProfile: ReturnType<typeof JobSeekerProfile.initialize>;
    EmployerProfile: ReturnType<typeof EmployerProfile.initialize>;
    Application: ReturnType<typeof Application.initialize>;
    JobListing: ReturnType<typeof JobListing.initialize>;
    Skill: ReturnType<typeof Skill.initialize>;
    SkillCategory: ReturnType<typeof SkillCategory.initialize>;
    JobSeekerSkill: ReturnType<typeof JobSeekerSkill.initialize>;
} 