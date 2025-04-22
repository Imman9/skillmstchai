import { Request, Response, NextFunction } from "express";
import { JobSeekerProfileService } from "../services/job-seeker-profile.service";

export class JobSeekerProfileController {
  private profileService = new JobSeekerProfileService();

  // Create a new profile
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const profile = await this.profileService.createProfile(req.body);
      res.status(201).json(profile);
    } catch (error) {
      next(error); // pass error to middleware
    }
  }

  // Get profile by UserId
  async getProfileByUserId(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = Number(req.params.userId);
      const profile = await this.profileService.getProfileByUserId(userId);

      if (!profile) {
        return res.status(404).json({ message: "Profile not found" });
      }

      res.status(200).json(profile); // ✅ send the profile
    } catch (error) {
      next(error);
    }
  }

  // Update profile by ID
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const profileId = Number(req.params.id);
      const updates = req.body;
      const updatedProfile = await this.profileService.updateProfile(
        profileId,
        updates
      );
      res.json(updatedProfile);
    } catch (error) {
      next(error);
    }
  }

  // Delete profile
  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const profileId = Number(req.params.id);
      await this.profileService.deleteProfile(profileId);
      res.json({ message: "Profile deleted successfully" });
    } catch (error) {
      next(error);
    }
  }
}
