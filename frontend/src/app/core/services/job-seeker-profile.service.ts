import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';

export interface JobSeekerProfile {
  id?: number;
  userId: number;
  headline?: string;
  summary?: string;
  phone?: string;
  location?: string;
  yearsOfExperience?: number;
  currentJobTitle?: string;
  preferredJobType?: string;
  preferredLocation?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  portfolioUrl?: string;
  availabilityStatus?: string;
  visibility?: 'public' | 'private';
  lastActive?: Date;
  profileCompletionPercentage?: number;
  willingToRelocate?: boolean;
  openToRemote?: boolean;
  desiredSalary?: number;
}

@Injectable({
  providedIn: 'root'
})
export class JobSeekerProfileService {
  private apiUrl = `${environment.apiUrl}/api/job-seeker-profiles`;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  getProfile(): Observable<{ status: string; data: JobSeekerProfile }> {
    const userId = this.authService.getCurrentUser()?.id;
    if (!userId) {
      throw new Error('User not authenticated');
    }
    return this.http.get<{ status: string; data: JobSeekerProfile }>(`${this.apiUrl}/user/${userId}`);
  }

  createProfile(profile: JobSeekerProfile): Observable<{ status: string; data: JobSeekerProfile }> {
    const userId = this.authService.getCurrentUser()?.id;
    if (!userId) {
      throw new Error('User not authenticated');
    }
    return this.http.post<{ status: string; data: JobSeekerProfile }>(this.apiUrl, { ...profile, userId });
  }

  updateProfile(id: number, profile: Partial<JobSeekerProfile>): Observable<{ status: string; data: JobSeekerProfile }> {
    const userId = this.authService.getCurrentUser()?.id;
    if (!userId) {
      throw new Error('User not authenticated');
    }
    return this.http.put<{ status: string; data: JobSeekerProfile }>(`${this.apiUrl}/${id}`, { ...profile, userId });
  }
} 