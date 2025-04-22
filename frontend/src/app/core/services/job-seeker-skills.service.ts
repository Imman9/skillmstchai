import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { JobSeekerSkill } from '../models/skill.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class JobSeekerSkillsService {
  private apiUrl = `${environment.apiUrl}/api/job-seeker-skills`;
  private headers: HttpHeaders;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
  }

  // Create new skill
  createSkill(skillData: {
    skillId: number;
    proficiencyLevel: number;
    yearsOfExperience?: number;
    lastUsedDate?: Date;
    isPrimary?: boolean;
  }): Observable<JobSeekerSkill> {
    return this.http.post<JobSeekerSkill>(
      `${this.apiUrl}/`,
      skillData,
      { headers: this.headers }
    );
  }

  // Get all skills for current job seeker
  getCurrentUserSkills(): Observable<JobSeekerSkill[]> {
    return this.http.get<JobSeekerSkill[]>(
      `${this.apiUrl}/jobseeker/current`,
      { headers: this.headers }
    );
  }

  // Get skills by job seeker ID (admin might need this)
  getSkillsByJobSeekerId(jobSeekerId: number): Observable<JobSeekerSkill[]> {
    return this.http.get<JobSeekerSkill[]>(
      `${this.apiUrl}/jobseeker/${jobSeekerId}`,
      { headers: this.headers }
    );
  }

  // Get single skill by ID
  getSkillById(id: number): Observable<JobSeekerSkill> {
    return this.http.get<JobSeekerSkill>(
      `${this.apiUrl}/${id}`,
      { headers: this.headers }
    );
  }

  // Update skill
  updateSkill(id: number, skillData: {
    proficiencyLevel?: number;
    yearsOfExperience?: number;
    lastUsedDate?: Date;
    isPrimary?: boolean;
  }): Observable<JobSeekerSkill> {
    return this.http.put<JobSeekerSkill>(
      `${this.apiUrl}/${id}`,
      skillData,
      { headers: this.headers }
    );
  }

  // Delete skill
  deleteSkill(id: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/${id}`,
      { headers: this.headers }
    );
  }
}