import { SkillCategory } from './skill-category.model';
import { Skill } from './skill.model';
import { JobSeekerSkill } from './job-seeker-skills';
import { JobSeekerProfile } from './job-seeker-profile.model';
import { User } from './User';
import { EmployerProfile } from './employer-profile.model';
import { JobListing } from './job-listing.model';
import { Application } from './application.model';

export function setupAssociations() {
    // User associations
    User.hasOne(JobSeekerProfile, {
        foreignKey: 'userId',
        as: 'jobSeekerProfile',
    });
    User.hasOne(EmployerProfile, {
        foreignKey: 'userId',
        as: 'employerProfile',
    });
    User.hasMany(Application, {
        foreignKey: 'referralId',
        as: 'referrals',
    });

    // Job Seeker Profile associations
    JobSeekerProfile.belongsTo(User, {
        foreignKey: 'userId',
        as: 'jobSeekerUser',
        onDelete: 'CASCADE',
    });
    JobSeekerProfile.hasMany(JobSeekerSkill, {
        foreignKey: 'job_seeker_id',
        as: 'jobSeekerSkills',
    });
    JobSeekerProfile.hasMany(Application, {
        foreignKey: 'jobSeekerId',
        as: 'applications',
    });

    // Employer Profile associations
    EmployerProfile.belongsTo(User, {
        foreignKey: 'userId',
        as: 'employerUser',
        onDelete: 'CASCADE',
    });
    EmployerProfile.hasMany(JobListing, {
        foreignKey: 'employerId',
        as: 'jobListings',
    });

    // Job Listing associations
    JobListing.belongsTo(EmployerProfile, {
        foreignKey: 'employerId',
        as: 'employerProfile',
    });
    JobListing.belongsTo(User, {
        foreignKey: 'hiringManagerId',
        as: 'hiringManager',
    });
    JobListing.hasMany(Application, {
        foreignKey: 'jobId',
        as: 'applications',
    });

    // Application associations
    Application.belongsTo(JobListing, {
        foreignKey: 'jobId',
        as: 'jobListing',
    });
    Application.belongsTo(JobSeekerProfile, {
        foreignKey: 'jobSeekerId',
        as: 'jobSeekerProfile',
    });
    Application.belongsTo(User, {
        foreignKey: 'referralId',
        as: 'referral',
    });

    // Skill Category associations
    SkillCategory.hasMany(SkillCategory, {
        foreignKey: 'parent_category_id',
        as: 'subcategories',
    });
    SkillCategory.belongsTo(SkillCategory, {
        foreignKey: 'parent_category_id',
        as: 'parentCategory',
    });
    SkillCategory.hasMany(Skill, {
        foreignKey: 'category_id',
        as: 'skills',
    });

    // Skill associations
    Skill.belongsTo(SkillCategory, {
        foreignKey: 'category_id',
        as: 'category',
    });
    Skill.hasMany(JobSeekerSkill, {
        foreignKey: 'skill_id',
        as: 'jobSeekerSkills',
    });

    // Job Seeker Skill associations
    JobSeekerSkill.belongsTo(Skill, {
        foreignKey: 'skill_id',
        as: 'skill',
    });
    JobSeekerSkill.belongsTo(JobSeekerProfile, {
        foreignKey: 'job_seeker_id',
        as: 'jobSeekerProfile',
    });
} 