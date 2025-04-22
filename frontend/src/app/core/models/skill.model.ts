export interface SkillCategory {
  id: number;
  name: string;
  description?: string;
  parent_category_id?: number;
  is_active: boolean;
  industry_relevance?: Record<string, any>;
}

export interface Skill {
  id: number;
  name: string;
  category_id: number;
  description?: string;
  is_technical: boolean;
  is_verified: boolean;
  created_at: Date;
  updated_at?: Date;
  status: string;
  demand_level: number;
  category?: SkillCategory;
}

export interface JobSeekerSkill {
  id: number;
  job_seeker_id: number;
  skill_id: number;
  proficiency_level: number;
  is_verified: boolean;
  years_of_experience: number;
  last_used_date?: Date;
  verification_date?: Date;
  verification_method?: string;
  is_primary: boolean;
  skill: Skill;
}

export interface SkillEndorsement {
  id: number;
  endorserId: number;
  endorserName: string;
  endorsementDate: Date;
  note?: string;
}

export interface AddSkillRequest {
  skillId: number;
  proficiencyLevel: number;
  yearsOfExperience: number;
  lastUsedDate: Date;
}

export interface UpdateSkillRequest {
  proficiencyLevel: number;
  yearsOfExperience: number;
  lastUsedDate: Date;
} 