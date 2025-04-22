import { Request, Response, NextFunction } from "express";
import { JobSeekerSkillService } from "../services/job_seeker-skills.service";
import { AppError } from "../utils/AppError";

// Add this type definition near your other types
interface AuthenticatedRequest extends Request {
  authUser: {
    id: number;
    email: string;
    role: 'job_seeker' | 'employer' | 'admin';
    status: 'active' | 'inactive' | 'suspended';
    firstName?: string;
    lastName?: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    // Add other user properties you might need
  };
}

export class JobSeekerSkillController {
  private skillService: JobSeekerSkillService;

  constructor() {
    this.skillService = new JobSeekerSkillService();
  }

  // Create a skill
  async create(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      // Ensure user is authenticated and authorized
      if (!req.authUser?.id) {
        throw new AppError('Authentication required', 401);
      }

      // Include jobSeekerId from authenticated user
      const skillData = {
        ...req.body,
        jobSeekerId: req.authUser.id
      };

      const skill = await this.skillService.createSkill(skillData);
      
      res.status(201).json({
        status: 'success',
        data: skill
      });
    } catch (error) {
      next(error);
    }
  }

  // Get all skills for a specific job seeker
  async getByJobSeekerId(req: Request, res: Response, next: NextFunction) {
    try {
      const jobSeekerId = Number(req.params.jobSeekerId);
      const skills = await this.skillService.getSkillsByJobSeekerId(jobSeekerId);
      
      res.status(200).json({
        status: 'success',
        data: skills
      });
    } catch (error) {
      next(error);
    }
  }

  // Get current user's skills
  async getCurrentUserSkills(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      if (!req.authUser?.id) {
        throw new AppError('Authentication required', 401);
      }

      const skills = await this.skillService.getSkillsByJobSeekerId(req.authUser.id);
      
      res.status(200).json({
        status: 'success',
        data: skills
      });
    } catch (error) {
      next(error);
    }
  }

  // Get a specific skill by ID
  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const skill = await this.skillService.getSkillById(id);
      
      if (!skill) {
        throw new AppError('Skill not found', 404);
      }
      
      res.status(200).json({
        status: 'success',
        data: skill
      });
    } catch (error) {
      next(error);
    }
  }

  // Update skill
  async update(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      if (!req.authUser?.id) {
        throw new AppError('Authentication required', 401);
      }

      const id = Number(req.params.id);
      const updated = await this.skillService.updateSkill(id, req.body);
      
      res.status(200).json({
        status: 'success',
        data: updated
      });
    } catch (error) {
      next(error);
    }
  }

  // Delete skill
  async delete(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      if (!req.authUser?.id) {
        throw new AppError('Authentication required', 401);
      }

      const id = Number(req.params.id);
      await this.skillService.deleteSkill(id);
      
      res.status(204).json({
        status: 'success',
        data: null
      });
    } catch (error) {
      next(error);
    }
  }
}