import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';

interface Candidate {
  id: string;
  name: string;
  title: string;
  location: string;
  experience: number;
  matchScore: number;
  skills: string[];
  status: string;
}

@Component({
  selector: 'app-view-candidates',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatProgressBarModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatMenuModule,
    MatTooltipModule,
  ],
  template: `
    <div class="view-candidates-container">
      <h2>View Candidates</h2>
      <div class="filters">
        <mat-form-field>
          <mat-label>Search</mat-label>
          <input matInput placeholder="Search candidates..." />
        </mat-form-field>
        <mat-form-field>
          <mat-label>Skills</mat-label>
          <mat-select multiple>
            <mat-option *ngFor="let skill of availableSkills" [value]="skill">
              {{ skill }}
            </mat-option>
          </mat-select>
        </mat-form-field>
        <mat-form-field>
          <mat-label>Experience</mat-label>
          <mat-select>
            <mat-option value="entry">Entry Level</mat-option>
            <mat-option value="mid">Mid Level</mat-option>
            <mat-option value="senior">Senior Level</mat-option>
          </mat-select>
        </mat-form-field>
      </div>
      <div class="candidates-list">
        <mat-card *ngFor="let candidate of candidates" class="candidate-card">
          <mat-card-header>
            <mat-card-title>{{ candidate.name }}</mat-card-title>
            <mat-card-subtitle>{{ candidate.title }}</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <div class="candidate-info">
              <p>{{ candidate.location }}</p>
              <p>{{ candidate.experience }} years of experience</p>
            </div>
            <div class="skills">
              <mat-chip-set>
                <mat-chip *ngFor="let skill of candidate.skills">
                  {{ skill }}
                </mat-chip>
              </mat-chip-set>
            </div>
            <div class="match-score">
              <span>Match Score: {{ candidate.matchScore }}%</span>
              <mat-progress-bar
                [mode]="'determinate'"
                [value]="candidate.matchScore"
              >
              </mat-progress-bar>
            </div>
          </mat-card-content>
          <mat-card-actions>
            <button mat-button color="primary" (click)="viewProfile(candidate)">
              View Profile
            </button>
            <button
              mat-button
              color="accent"
              (click)="scheduleInterview(candidate)"
            >
              Schedule Interview
            </button>
            <button mat-icon-button [matMenuTriggerFor]="menu">
              <i class="fas fa-ellipsis-v"></i>
            </button>

            <mat-menu #menu="matMenu">
              <button mat-menu-item (click)="downloadResume(candidate)">
                Download Resume
              </button>
              <button mat-menu-item (click)="sendMessage(candidate)">
                Send Message
              </button>
              <button mat-menu-item (click)="rejectCandidate(candidate)">
                Reject
              </button>
            </mat-menu>
          </mat-card-actions>
        </mat-card>
      </div>
    </div>
  `,
  styles: [
    `
      .view-candidates-container {
        padding: 20px;
      }
      .filters {
        display: flex;
        gap: 20px;
        margin-bottom: 20px;
      }
      .candidates-list {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 20px;
      }
      .candidate-card {
        height: 100%;
      }
      .candidate-info {
        margin: 10px 0;
      }
      .skills {
        margin: 10px 0;
      }
      .match-score {
        margin: 10px 0;
      }
      mat-card-actions {
        display: flex;
        justify-content: space-between;
      }
    `,
  ],
})
export class ViewCandidatesComponent implements OnInit {
  availableSkills: string[] = [
    'Angular',
    'React',
    'Vue',
    'Node.js',
    'Python',
    'Java',
    'C#',
    'SQL',
    'AWS',
    'Azure',
  ];

  candidates: Candidate[] = [
    {
      id: '1',
      name: 'John Doe',
      title: 'Senior Frontend Developer',
      location: 'New York, NY',
      experience: 5,
      matchScore: 95,
      skills: ['Angular', 'TypeScript', 'RxJS', 'NgRx'],
      status: 'New',
    },
    {
      id: '2',
      name: 'Jane Smith',
      title: 'Full Stack Developer',
      location: 'San Francisco, CA',
      experience: 3,
      matchScore: 88,
      skills: ['React', 'Node.js', 'MongoDB', 'AWS'],
      status: 'Reviewed',
    },
  ];

  constructor() {}

  ngOnInit(): void {}

  viewProfile(candidate: Candidate): void {
    console.log('Viewing profile:', candidate);
    // Implement view profile functionality
  }

  scheduleInterview(candidate: Candidate): void {
    console.log('Scheduling interview for:', candidate);
    // Implement schedule interview functionality
  }

  downloadResume(candidate: Candidate): void {
    console.log('Downloading resume for:', candidate);
    // Implement download resume functionality
  }

  sendMessage(candidate: Candidate): void {
    console.log('Sending message to:', candidate);
    // Implement send message functionality
  }

  rejectCandidate(candidate: Candidate): void {
    console.log('Rejecting candidate:', candidate);
    // Implement reject candidate functionality
  }
}
