import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';

interface CareerPath {
  id: number;
  title: string;
  description: string;
  currentLevel: string;
  nextLevel: string;
  progress: number;
  requiredSkills: string[];
  milestones: Milestone[];
}

interface Milestone {
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'upcoming';
  skills: string[];
  timeframe: string;
  expanded?: boolean;
}

@Component({
  selector: 'app-career-paths',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatStepperModule,
    MatChipsModule,
    MatExpansionModule,
    MatDividerModule,
    MatProgressBarModule,
    MatInputModule,
    MatDialogModule,
  ],
  template: `
    <div class="career-paths-container">
      <mat-card class="header-card">
        <mat-card-header>
          <mat-card-title>Career Development</mat-card-title>
          <mat-card-subtitle
            >Plan and track your career progression</mat-card-subtitle
          >
        </mat-card-header>
        <mat-card-content>
          <mat-form-field appearance="fill" class="search-bar">
            <mat-label>Search Career Paths</mat-label>
            <input
              matInput
              [(ngModel)]="searchTerm"
              placeholder="e.g. Full Stack"
            />
          </mat-form-field>
        </mat-card-content>
      </mat-card>

      <div class="paths-grid">
        <mat-card *ngFor="let path of filteredCareerPaths()" class="path-card">
          <mat-card-header>
            <mat-card-title>{{ path.title }}</mat-card-title>
            <mat-card-subtitle>{{ path.description }}</mat-card-subtitle>
          </mat-card-header>

          <mat-card-content>
            <div class="level-progress">
              <div class="current-level">
                <span class="level-label">Current Level</span>
                <span class="level-value">{{ path.currentLevel }}</span>
              </div>

              <div class="next-level">
                <span class="level-label">Next Level</span>
                <span class="level-value">{{ path.nextLevel }}</span>
              </div>
            </div>

            <div class="progress-section">
              <div class="progress-label">Progress: {{ path.progress }}%</div>
              <mat-progress-bar
                mode="determinate"
                [value]="path.progress"
                color="primary"
              ></mat-progress-bar>
              <div class="progress-controls">
                <button mat-mini-button (click)="adjustProgress(path, -5)">
                  -5%
                </button>
                <button mat-mini-button (click)="adjustProgress(path, 5)">
                  +5%
                </button>
              </div>
            </div>

            <mat-divider></mat-divider>

            <div class="required-skills">
              <h4>Required Skills</h4>
              <mat-chip-set>
                <mat-chip *ngFor="let skill of path.requiredSkills">
                  {{ skill }}
                </mat-chip>
              </mat-chip-set>
            </div>

            <mat-divider></mat-divider>

            <div class="milestones-section">
              <h4>Career Milestones</h4>
              <mat-accordion>
                <mat-expansion-panel *ngFor="let milestone of path.milestones">
                  <mat-expansion-panel-header>
                    <mat-panel-title>
                      {{ milestone.title }}
                      <span class="dot" [ngClass]="milestone.status"></span>
                    </mat-panel-title>
                    <mat-panel-description>
                      <mat-chip
                        [color]="getStatusColor(milestone.status)"
                        selected
                      >
                        {{ milestone.status | titlecase }}
                      </mat-chip>
                    </mat-panel-description>
                  </mat-expansion-panel-header>

                  <p>{{ milestone.description }}</p>
                  <mat-chip-set>
                    <mat-chip
                      *ngFor="let skill of milestone.skills"
                      color="primary"
                      selected
                    >
                      {{ skill }}
                    </mat-chip>
                  </mat-chip-set>
                  <p class="timeframe">Timeframe: {{ milestone.timeframe }}</p>
                </mat-expansion-panel>
              </mat-accordion>
            </div>
          </mat-card-content>

          <mat-card-actions>
            <button mat-button color="primary">Update Progress</button>
            <button mat-button color="primary">View Details</button>
          </mat-card-actions>
        </mat-card>
      </div>
    </div>
  `,
  styles: [
    `
      .career-paths-container {
        padding: 20px;
        max-width: 1200px;
        margin: 0 auto;
      }

      .header-card {
        margin-bottom: 20px;
      }

      .search-bar {
        width: 100%;
        margin-top: 10px;
      }

      .paths-grid {
        display: grid;
        gap: 20px;
        grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
      }

      .path-card {
        height: 100%;
      }

      .level-progress {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 20px 0;
        padding: 16px;
        background-color: #f5f5f5;
        border-radius: 8px;
      }

      .current-level,
      .next-level {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
      }

      .level-label {
        font-size: 12px;
        color: rgba(0, 0, 0, 0.6);
        margin-bottom: 4px;
      }

      .level-value {
        font-size: 16px;
        font-weight: 500;
        color: rgba(0, 0, 0, 0.87);
      }

      .progress-section {
        margin: 20px 0;
      }

      .progress-label {
        margin-bottom: 8px;
        color: rgba(0, 0, 0, 0.6);
      }

      .progress-controls {
        display: flex;
        gap: 10px;
        margin-top: 8px;
      }

      .required-skills,
      .milestones-section {
        margin: 20px 0;
      }

      .milestones-section h4 {
        margin-bottom: 12px;
      }

      .timeframe {
        color: rgba(0, 0, 0, 0.6);
        margin-top: 8px;
      }

      .dot {
        height: 10px;
        width: 10px;
        border-radius: 50%;
        display: inline-block;
        margin-left: 8px;
      }

      .completed {
        background-color: #1976d2;
      }

      .in-progress {
        background-color: #ff9800;
      }

      .upcoming {
        background-color: #f44336;
      }

      mat-card-actions {
        display: flex;
        gap: 8px;
      }

      @media (max-width: 768px) {
        .paths-grid {
          grid-template-columns: 1fr;
        }

        .level-progress {
          flex-direction: column;
          gap: 16px;
        }
      }
    `,
  ],
})
export class CareerPathsComponent {
  searchTerm = '';

  careerPaths: CareerPath[] = [
    {
      id: 1,
      title: 'Frontend Development',
      description: 'Specializing in modern web development technologies',
      currentLevel: 'Mid-Level Developer',
      nextLevel: 'Senior Developer',
      progress: 65,
      requiredSkills: [
        'Advanced JavaScript',
        'Angular',
        'System Design',
        'Team Leadership',
      ],
      milestones: [
        {
          title: 'Technical Leadership',
          description: 'Lead a team of 3-5 developers on a major project',
          status: 'in-progress',
          skills: ['Team Leadership', 'Project Management'],
          timeframe: '6-12 months',
        },
        {
          title: 'Architecture Design',
          description: 'Design and implement complex frontend architectures',
          status: 'upcoming',
          skills: ['System Design', 'Performance Optimization'],
          timeframe: '3-6 months',
        },
        {
          title: 'Mentorship Program',
          description: 'Mentor junior developers and conduct code reviews',
          status: 'completed',
          skills: ['Mentoring', 'Code Review'],
          timeframe: 'Completed',
        },
      ],
    },
    {
      id: 2,
      title: 'Full Stack Development',
      description: 'Expanding expertise across the entire tech stack',
      currentLevel: 'Frontend Specialist',
      nextLevel: 'Full Stack Developer',
      progress: 40,
      requiredSkills: [
        'Node.js',
        'Database Design',
        'API Development',
        'DevOps',
      ],
      milestones: [
        {
          title: 'Backend Development',
          description: 'Build RESTful APIs and microservices',
          status: 'in-progress',
          skills: ['Node.js', 'API Design'],
          timeframe: '6 months',
        },
        {
          title: 'Database Management',
          description: 'Design and optimize database schemas',
          status: 'upcoming',
          skills: ['SQL', 'NoSQL', 'Data Modeling'],
          timeframe: '3 months',
        },
        {
          title: 'Cloud Services',
          description: 'Deploy and manage applications in the cloud',
          status: 'upcoming',
          skills: ['AWS', 'Docker', 'Kubernetes'],
          timeframe: '6 months',
        },
      ],
    },
  ];

  getStatusColor(status: string): string {
    switch (status) {
      case 'completed':
        return 'primary';
      case 'in-progress':
        return 'accent';
      case 'upcoming':
        return 'warn';
      default:
        return '';
    }
  }

  filteredCareerPaths(): CareerPath[] {
    if (!this.searchTerm.trim()) return this.careerPaths;
    return this.careerPaths.filter(
      (path) =>
        path.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        path.description.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  adjustProgress(path: CareerPath, delta: number): void {
    path.progress = Math.max(0, Math.min(100, path.progress + delta));
  }
}
