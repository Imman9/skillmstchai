import { JobSeekerProfile } from "../models/job-seeker-profile.model";
import { JobSeekerProfileCreationAttributes } from "../models/job-seeker-profile.model";
import { User } from "../models/User";

export class JobSeekerProfileService {
  //create a new profile
  async createProfile(data: JobSeekerProfileCreationAttributes) {
    return await JobSeekerProfile.create(data);
  }

  //Get profile by userId
  async getProfileByUserId(userId: number) {
    return await JobSeekerProfile.findOne({
      where: { userId },
      include: [{ model: User, as: "user" }],
    });
  }
  //get profile by Profile Id
  async getProfileById(id: number) {
    return await JobSeekerProfile.findByPk(id, {
      include: [{ model: User, as: "user" }],
    });
  }
  //update a profile
  async updateProfile(
    id: number,
    updates: Partial<JobSeekerProfileCreationAttributes>
  ) {
    const profile = await JobSeekerProfile.findByPk(id);
    if (!profile) throw new Error("Profile not found");
    return await profile.update(updates);
  }
  //delete profile
  async deleteProfile(id: number) {
    const profile = await JobSeekerProfile.findByPk(id);
    if (!profile) throw new Error("Profile not found");
    return await profile.destroy();
  }
}
