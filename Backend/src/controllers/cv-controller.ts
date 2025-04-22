import { Request, Response, NextFunction } from "express";
import { AppError } from "../middleware/errorHandler";
import { CVService } from "../services/cv-service";
import { UserRole } from "../models/User";

interface AuthenticatedRequest extends Omit<Request, 'user'> {
  user?: {
    id: number;
    email: string;
    role: UserRole;
    firstName?: string;
    lastName?: string;
    isActive: boolean;
  };
}

export class CVController {
  constructor(private readonly cvService: CVService = new CVService()) {
    // Bind methods to ensure correct 'this' context
    this.getUserCVs = this.getUserCVs.bind(this);
    this.getCVById = this.getCVById.bind(this);
    this.createCV = this.createCV.bind(this);
    this.updateCV = this.updateCV.bind(this);
    this.deleteCV = this.deleteCV.bind(this);
    this.setDefaultCV = this.setDefaultCV.bind(this);
    this.getPublicCV = this.getPublicCV.bind(this);
  }

  async getUserCVs(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      if (!req.user?.id) {
        throw new AppError("User not authenticated", 401);
      }

      // Get the job seeker profile id from query or params
      const jobSeekerId = parseInt(req.params.jobSeekerId || req.query.jobSeekerId as string);
      
      if (isNaN(jobSeekerId)) {
        throw new AppError("Job seeker ID is required", 400);
      }
      
      const cvs = await this.cvService.getUserCVs(jobSeekerId);
      
      res.status(200).json({
        status: "success",
        results: cvs.length,
        data: {
          cvs,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async getCVById(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      if (!req.user?.id) {
        throw new AppError("User not authenticated", 401);
      }

      const cvId = parseInt(req.params.id);
      
      if (isNaN(cvId)) {
        throw new AppError("Valid CV ID is required", 400);
      }
      
      const cv = await this.cvService.getCVById(cvId);
      
      res.status(200).json({
        status: "success",
        data: {
          cv,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async createCV(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      if (!req.user?.id) {
        throw new AppError("User not authenticated", 401);
      }

      const { 
        jobSeekerId, 
        templateId, 
        title, 
        fileUrl, 
        isDefault, 
        fileSize, 
        fileType,
        language,
        isPublic 
      } = req.body;
      
      if (!jobSeekerId) {
        throw new AppError("Job seeker ID is required", 400);
      }
      
      if (!title) {
        throw new AppError("CV title is required", 400);
      }
      
      if (!fileUrl) {
        throw new AppError("File URL is required", 400);
      }
      
      const cv = await this.cvService.createCV({
        jobSeekerId,
        templateId,
        title,
        fileUrl,
        isDefault,
        fileSize,
        fileType,
        language,
        isPublic
      });
      
      res.status(201).json({
        status: "success",
        data: {
          cv,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async updateCV(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      if (!req.user?.id) {
        throw new AppError("User not authenticated", 401);
      }

      const cvId = parseInt(req.params.id);
      
      if (isNaN(cvId)) {
        throw new AppError("Valid CV ID is required", 400);
      }
      
      const { 
        title, 
        fileUrl, 
        isDefault, 
        fileSize, 
        fileType,
        templateId,
        language,
        isPublic 
      } = req.body;
      
      const cv = await this.cvService.updateCV(cvId, {
        title,
        fileUrl,
        isDefault,
        fileSize,
        fileType,
        templateId,
        language,
        isPublic
      });
      
      res.status(200).json({
        status: "success",
        data: {
          cv,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteCV(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      if (!req.user?.id) {
        throw new AppError("User not authenticated", 401);
      }

      const cvId = parseInt(req.params.id);
      
      if (isNaN(cvId)) {
        throw new AppError("Valid CV ID is required", 400);
      }
      
      await this.cvService.deleteCV(cvId);
      
      res.status(200).json({
        status: "success",
        message: "CV deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  async setDefaultCV(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      if (!req.user?.id) {
        throw new AppError("User not authenticated", 401);
      }

      const cvId = parseInt(req.params.id);
      
      if (isNaN(cvId)) {
        throw new AppError("Valid CV ID is required", 400);
      }
      
      const cv = await this.cvService.setDefaultCV(cvId);
      
      res.status(200).json({
        status: "success",
        data: {
          cv,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async getPublicCV(req: Request, res: Response, next: NextFunction) {
    try {
      const cvId = parseInt(req.params.id);
      
      if (isNaN(cvId)) {
        throw new AppError("Valid CV ID is required", 400);
      }
      
      const cv = await this.cvService.getPublicCV(cvId);
      
      if (!cv) {
        throw new AppError("CV not found or not public", 404);
      }
      
      res.status(200).json({
        status: "success",
        data: {
          cv,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}