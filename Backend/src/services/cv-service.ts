import { Op, WhereOptions } from "sequelize";
import { CV } from "../models/cv.model";
import { AppError } from "../middleware/errorHandler";
import { JobSeekerProfile } from "../models/job-seeker-profile.model";

export class CVService {
  async getCVById(id: number): Promise<CV> {
    const cv = await CV.findByPk(id);
    
    if (!cv) {
      throw new AppError("CV not found", 404);
    }
    
    return cv;
  }

  async getUserCVs(jobSeekerId: number): Promise<CV[]> {
    // Check if the job seeker exists
    const jobSeekerProfile = await JobSeekerProfile.findByPk(jobSeekerId);
    
    if (!jobSeekerProfile) {
      throw new AppError("Job seeker profile not found", 404);
    }
    
    return CV.findAll({
      where: {
        jobSeekerId,
        
      },
      order: [['lastUpdated', 'DESC']]
    });
  }

  async createCV(data: {
    jobSeekerId: number;
    templateId?: number;
    title: string;
    fileUrl: string;
    isDefault?: boolean;
    fileSize?: number;
    fileType?: string;
    language?: string;
    isPublic?: boolean;
  }): Promise<CV> {
    // Check if the job seeker exists
    const jobSeekerProfile = await JobSeekerProfile.findByPk(data.jobSeekerId);
    
    if (!jobSeekerProfile) {
      throw new AppError("Job seeker profile not found", 404);
    }
    
    // If this CV is set as default, update other CVs to be non-default
    if (data.isDefault) {
      await CV.update(
        { isDefault: false },
        { 
          where: { 
            jobSeekerId: data.jobSeekerId,
            isDefault: true 
          } as WhereOptions<any>
        }
      );
    }
    
    // If there are no CVs yet for this user, make this one default
    const whereOptions: WhereOptions<any> = {
      jobSeekerId: data.jobSeekerId,
      deletedAt: { [Op.eq]: null }
    };
    
    const cvCount = await CV.count({ 
      where: whereOptions
    });
    
    const isDefault = cvCount === 0 ? true : (data.isDefault || false);
    
    return CV.create({
      ...data,
      isDefault,
      version: 1,
      language: data.language || 'en',
      isPublic: data.isPublic || false,
      createdAt: new Date(),
      lastUpdated: new Date()
    });
  }

  async updateCV(id: number, data: {
    title?: string;
    fileUrl?: string;
    isDefault?: boolean;
    fileSize?: number;
    fileType?: string;
    templateId?: number;
    language?: string;
    isPublic?: boolean;
  }): Promise<CV> {
    const cv = await this.getCVById(id);
    
    // If this CV is set as default, update other CVs to be non-default
    if (data.isDefault) {
      const whereOptions: WhereOptions<any> = {
        jobSeekerId: cv.jobSeekerId,
        id: { [Op.ne]: id },
        isDefault: true
      };
      
      await CV.update(
        { isDefault: false },
        { where: whereOptions }
      );
    }
    
    // Increment version if file URL changes
    const version = data.fileUrl && data.fileUrl !== cv.fileUrl 
      ? cv.version + 1 
      : cv.version;
    
    await cv.update({
      ...data,
      version,
      lastUpdated: new Date()
    });
    
    return this.getCVById(id);
  }

  async deleteCV(id: number): Promise<void> {
    const cv = await this.getCVById(id);
    
    // Soft delete by setting deletedAt
    await cv.update({ deletedAt: new Date() });
    
    // If deleted CV was default, set another CV as default if available
    if (cv.isDefault) {
      const whereOptions: WhereOptions<any> = {
        jobSeekerId: cv.jobSeekerId,
        id: { [Op.ne]: id },
        deletedAt: { [Op.eq]: null }
      };
      
      const anotherCV = await CV.findOne({
        where: whereOptions,
        order: [['lastUpdated', 'DESC']]
      });
      
      if (anotherCV) {
        await anotherCV.update({ isDefault: true });
      }
    }
  }

  async setDefaultCV(id: number): Promise<CV> {
    const cv = await this.getCVById(id);
    
    // Reset all other CVs for this user to not be default
    const whereOptions: WhereOptions<any> = {
      jobSeekerId: cv.jobSeekerId,
      id: { [Op.ne]: id },
      isDefault: true
    };
    
    await CV.update(
      { isDefault: false },
      { where: whereOptions }
    );
    
    // Set this one as default
    await cv.update({ isDefault: true });
    
    return this.getCVById(id);
  }

  async getPublicCV(id: number): Promise<CV | null> {
    const whereOptions: WhereOptions<any> = {
      id,
      isPublic: true,
      deletedAt: { [Op.eq]: null }
    };
    
    const cv = await CV.findOne({
      where: whereOptions
    });
    
    return cv;
  }
}