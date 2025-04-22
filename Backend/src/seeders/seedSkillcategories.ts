// src/seeders/seedSkillCategories.ts
import { sequelize } from '../config/database';
import { SkillCategory } from '../models/skill-category.model'; // you'll need to define this model
import { Skill } from '../models/skills'; // assumes you have Skill model too

export async function seedSkillCategories() {
  try {
    await sequelize.authenticate();
    console.log('Connected to DB ✅');

    const categories = [
      { 
        name: 'Programming Languages', 
        description: 'Languages like JavaScript, Python',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { 
        name: 'DevOps Tools', 
        description: 'Tools like Docker, Kubernetes',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { 
        name: 'Frontend Frameworks', 
        description: 'React, Angular, etc.',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    for (const category of categories) {
      await SkillCategory.create(category);
    }

    console.log('🌱 Skill categories seeded!');
  } catch (error) {
    console.error('❌ Error seeding skill categories:', error);
  } finally {
    await sequelize.close();
    process.exit();
  }
}

seedSkillCategories();
