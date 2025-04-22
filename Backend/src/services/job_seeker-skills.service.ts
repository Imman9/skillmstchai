import { JobSeekerSkill } from "../models/job-seeker-skills";
import { Skill } from "../models/skill.model";

export class JobSeekerSkillService {
  //create new skill
  async createSkill(data: any) {
    return await JobSeekerSkill.create(data);
  }
  //get all skills for a specific job seeker
  async getSkillsByJobSeekerId(jobSeekerId: number) {
    const skills = await JobSeekerSkill.findAll({
      where: { jobSeekerId: jobSeekerId },
      include: [
        {
          model: Skill,
          as: 'skill',
        },
      ],
    });
    return skills;
  }
  async getSkillById(id: number) {
    return await JobSeekerSkill.findByPk(id);
  }
  //update a skill entry
  async updateSkill(id: number, updates: any) {
    const skill = await JobSeekerSkill.findByPk(id);
    if (!skill) {
      throw new Error("Skill not found");
    }
    return await skill.update(updates);
  }
  //delete a skill
  async deleteSkill(id: number) {
    const skill = await JobSeekerSkill.findByPk(id);
    if (!skill) {
      throw new Error("Skill not found");
    }
    await skill.destroy();
    return { message: "Skill deleted successfully" };
  }
}
