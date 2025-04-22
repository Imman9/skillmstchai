import { JobSeekerSkill } from "../models/job-seeker-skills"; // Import the JobSeekerSkill model
import { Skill } from "../models/skills"; // Import the Skill model
import { sequelize } from "../config/database"; // Make sure the sequelize instance is imported

// List of sample skills to insert
const skills = [
    { name: "JavaScript", isTechnical: true },
    { name: "TypeScript", isTechnical: true },
    { name: "React", isTechnical: true },
    { name: "Node.js", isTechnical: true },
    { name: "Python", isTechnical: true },
    { name: "Java", isTechnical: true },
    { name: "SQL", isTechnical: true },
    { name: "Docker", isTechnical: true },
    { name: "Git", isTechnical: true },
    { name: "GraphQL", isTechnical: true },
];

async function seedSkills() {
    try {
        // Synchronize the database (optional depending on if you want to reset the tables)
        await sequelize.sync();

        // First create the skills
        const createdSkills = await Promise.all(
            skills.map(skill => Skill.create({
                ...skill,
                isVerified: false,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date()
            }))
        );

        // Then create JobSeekerSkill entries
        for (const skill of createdSkills) {
            await JobSeekerSkill.create({
                jobSeekerId: 1,
                skillId: skill.id,
                proficiencyLevel: 3,
                isVerified: false,
                isPrimary: true,
                createdAt: new Date(),
                updatedAt: new Date()
            });
        }

        console.log("Skills have been successfully seeded.");
    } catch (error) {
        console.error("Error seeding skills:", error);
    }
}

// Execute the seeding
seedSkills();
