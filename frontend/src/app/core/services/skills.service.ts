import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Skill, SkillCategory } from '../models/skill.model';
import { environment } from '../../../environments/environment';

interface ApiResponse<T> {
  status: string;
  data: T;
}

@Injectable({
  providedIn: 'root'
})
export class SkillsService {
  private apiUrl = `${environment.apiUrl}/api/skills`;

  constructor(private http: HttpClient) {}

  getAllSkills(): Observable<Skill[]> {
    return this.http.get<ApiResponse<Skill[]>>(`${this.apiUrl}`).pipe(
      map(response => response.data)
    );
  }

  getSkillById(id: number): Observable<Skill> {
    return this.http.get<ApiResponse<Skill>>(`${this.apiUrl}/${id}`).pipe(
      map(response => response.data)
    );
  }

  createSkill(skill: Partial<Skill>): Observable<Skill> {
    return this.http.post<ApiResponse<Skill>>(`${this.apiUrl}`, skill).pipe(
      map(response => response.data)
    );
  }

  updateSkill(id: number, skill: Partial<Skill>): Observable<Skill> {
    return this.http.put<ApiResponse<Skill>>(`${this.apiUrl}/${id}`, skill).pipe(
      map(response => response.data)
    );
  }

  deleteSkill(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getAllCategories(): Observable<SkillCategory[]> {
    return this.http.get<ApiResponse<SkillCategory[]>>(`${this.apiUrl}/categories`).pipe(
      map(response => response.data)
    );
  }
} 