import { Request, Response } from 'express';
import { models } from '../models';

export class SkillsController {
  async getAllSkills(req: Request, res: Response) {
    try {
      // Fetch all skills with their categories
      const skills = await models.Skill.findAll({
        include: [{
          model: models.SkillCategory,
          as: 'category',
          attributes: ['id', 'name']
        }],
        attributes: [
          'id', 
          'name', 
          'description', 
          'is_technical', 
          'is_verified',
          'demand_level',
          'status',
          'created_at',
          'updated_at'
        ]
      });

      if (!skills || skills.length === 0) {
        return res.status(404).json({
          status: 'error',
          message: 'No skills found'
        });
      }

      res.json({
        status: 'success',
        data: skills
      });
    } catch (error) {
      console.error('Error fetching skills:', error);
      res.status(500).json({
        status: 'error',
        message: 'Failed to fetch skills',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  async getSkillById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const skill = await models.Skill.findByPk(id, {
        include: [{
          model: models.SkillCategory,
          as: 'category',
          attributes: ['id', 'name', 'description'] // Added description
        }],
        attributes: [
          'id', 
          'name', 
          'description', 
          'is_technical', 
          'is_verified',
          'demand_level',
          'status',
          'created_at',
          'updated_at'
        ]
      });

      if (!skill) {
        return res.status(404).json({
          status: 'error',
          message: 'Skill not found'
        });
      }

      res.json({
        status: 'success',
        data: skill
      });
    } catch (error) {
      console.error('Error fetching skill:', error);
      res.status(500).json({
        status: 'error',
        message: 'Failed to fetch skill',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  // Additional CRUD operations that would be useful
  async createSkill(req: Request, res: Response) {
    try {
      const { name, category_id, description, is_technical, is_verified, demand_level } = req.body;
      
      const newSkill = await models.Skill.create({
        name,
        category_id,
        description,
        is_technical: is_technical || false,
        is_verified: is_verified || false,
        demand_level,
        status: 'active' // Default status
      });

      res.status(201).json({
        status: 'success',
        data: newSkill
      });
    } catch (error) {
      console.error('Error creating skill:', error);
      res.status(500).json({
        status: 'error',
        message: 'Failed to create skill',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  async updateSkill(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updates = req.body;
      
      // Don't allow updating id or created_at
      delete updates.id;
      delete updates.created_at;

      // Set updated_at to current time
      updates.updated_at = new Date();

      const [affectedCount] = await models.Skill.update(updates, {
        where: { id }
      });

      if (affectedCount === 0) {
        return res.status(404).json({
          status: 'error',
          message: 'Skill not found or no changes made'
        });
      }

      const updatedSkill = await models.Skill.findByPk(id);
      res.json({
        status: 'success',
        data: updatedSkill
      });
    } catch (error) {
      console.error('Error updating skill:', error);
      res.status(500).json({
        status: 'error',
        message: 'Failed to update skill',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  async deleteSkill(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const deletedCount = await models.Skill.destroy({
        where: { id }
      });

      if (deletedCount === 0) {
        return res.status(404).json({
          status: 'error',
          message: 'Skill not found'
        });
      }

      res.json({
        status: 'success',
        message: 'Skill deleted successfully'
      });
    } catch (error) {
      console.error('Error deleting skill:', error);
      res.status(500).json({
        status: 'error',
        message: 'Failed to delete skill',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }
}