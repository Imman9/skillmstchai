import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressBarModule } from '@angular/material/progress-bar';

interface JobMatch {
  id: string;
  title: string;
  company: string;
  location: string;
  matchScore: number;
  skills: string[];
  postedDate: Date;
}

@Component({
  selector: 'app-job-matches',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatProgressBarModule,
  ],
  template: `
    <div class="job-matches-container">
      <h2>Your Job Matches</h2>
      <div class="job-list">
        <mat-card *ngFor="let job of jobMatches" class="job-card">
          <mat-card-header>
            <mat-card-title>{{ job.title }}</mat-card-title>
            <mat-card-subtitle
              >{{ job.company }} - {{ job.location }}</mat-card-subtitle
            >
          </mat-card-header>
          <mat-card-content>
            <div class="match-score">
              <span>Match Score: {{ job.matchScore }}%</span>
              <mat-progress-bar [mode]="'determinate'" [value]="job.matchScore">
              </mat-progress-bar>
            </div>
            <div class="skills">
              <mat-chip-set>
                <mat-chip *ngFor="let skill of job.skills">
                  {{ skill }}
                </mat-chip>
              </mat-chip-set>
            </div>
            <div class="posted-date">Posted: {{ job.postedDate | date }}</div>
          </mat-card-content>
          <mat-card-actions>
            <button mat-button color="primary" (click)="viewJobDetails(job)">
              View Details
            </button>
            <button mat-button color="accent" (click)="applyForJob(job)">
              Apply Now
            </button>
          </mat-card-actions>
        </mat-card>
      </div>
    </div>
  `,
  styles: [
    `
      .job-matches-container {
        padding: 20px;
      }

      .job-list {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 20px;
        margin-top: 20px;
      }

      .job-card {
        height: 100%;
      }

      .match-score {
        margin: 10px 0;
      }

      .skills {
        margin: 10px 0;
      }

      .posted-date {
        color: #666;
        font-size: 0.9em;
        margin-top: 10px;
      }

      mat-card-actions {
        display: flex;
        justify-content: space-between;
        padding: 16px;
      }
    `,
  ],
})
export class JobMatchesComponent implements OnInit {
  jobMatches: JobMatch[] = [
    {
      id: '1',
      title: 'Senior Frontend Developer',
      company: 'TechCorp',
      location: 'New York, NY',
      matchScore: 95,
      skills: ['Angular', 'TypeScript', 'RxJS', 'NgRx'],
      postedDate: new Date('2024-03-15'),
    },
    {
      id: '2',
      title: 'Full Stack Developer',
      company: 'InnovateTech',
      location: 'San Francisco, CA',
      matchScore: 88,
      skills: ['Angular', 'Node.js', 'MongoDB', 'AWS'],
      postedDate: new Date('2024-03-10'),
    },
    {
      id: '3',
      title: 'UI/UX Developer',
      company: 'DesignHub',
      location: 'Chicago, IL',
      matchScore: 82,
      skills: ['Angular', 'SCSS', 'Figma', 'UI/UX'],
      postedDate: new Date('2024-03-05'),
    },
  ];

  constructor() {}

  ngOnInit(): void {}

  viewJobDetails(job: JobMatch): void {
    // TODO: Implement job details view
    console.log('Viewing job details:', job);
  }

  applyForJob(job: JobMatch): void {
    // TODO: Implement job application
    console.log('Applying for job:', job);
  }
}
