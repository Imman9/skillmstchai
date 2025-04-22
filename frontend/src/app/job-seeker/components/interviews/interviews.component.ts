import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';

interface Interview {
  id: number;
  company: string;
  position: string;
  date: string;
  time: string;
  type: 'Technical' | 'HR' | 'Culture Fit';
  status: 'Scheduled' | 'Completed' | 'Cancelled';
  notes?: string;
  preparationMaterials?: string[];
}

@Component({
  selector: 'app-interviews',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatChipsModule,
    MatDividerModule,
  ],
  template: `
    <div class="interviews-container">
      <mat-card class="header-card">
        <mat-card-header>
          <mat-card-title>Interviews</mat-card-title>
          <mat-card-subtitle
            >Manage your interviews and preparation</mat-card-subtitle
          >
        </mat-card-header>
      </mat-card>

      <mat-tab-group>
        <mat-tab label="Upcoming Interviews">
          <div class="interview-list">
            <mat-card
              *ngFor="let interview of upcomingInterviews"
              class="interview-card"
            >
              <mat-card-header>
                <mat-card-title>{{ interview.position }}</mat-card-title>
                <mat-card-subtitle>{{ interview.company }}</mat-card-subtitle>
                <mat-chip-set>
                  <mat-chip [color]="getStatusColor(interview.status)" selected>
                    {{ interview.status }}
                  </mat-chip>
                </mat-chip-set>
              </mat-card-header>

              <mat-card-content>
                <div class="interview-details">
                  <div class="detail-item">
                    <span>{{ interview.date }}</span>
                  </div>
                  <div class="detail-item">
                    <span>{{ interview.time }}</span>
                  </div>
                  <div class="detail-item">
                    <span>{{ interview.type }}</span>
                  </div>
                </div>

                <mat-divider></mat-divider>

                <div
                  class="preparation-section"
                  *ngIf="interview.preparationMaterials"
                >
                  <h4>Preparation Materials</h4>
                  <ul>
                    <li *ngFor="let material of interview.preparationMaterials">
                      {{ material }}
                    </li>
                  </ul>
                </div>

                <div class="notes-section" *ngIf="interview.notes">
                  <h4>Notes</h4>
                  <p>{{ interview.notes }}</p>
                </div>
              </mat-card-content>

              <mat-card-actions>
                <button mat-button color="primary">Join Meeting</button>
                <button mat-button color="primary">Edit</button>
                <button mat-button color="warn">Cancel</button>
              </mat-card-actions>
            </mat-card>
          </div>
        </mat-tab>

        <mat-tab label="Past Interviews">
          <div class="interview-list">
            <mat-card
              *ngFor="let interview of pastInterviews"
              class="interview-card"
            >
              <mat-card-header>
                <mat-card-title>{{ interview.position }}</mat-card-title>
                <mat-card-subtitle>{{ interview.company }}</mat-card-subtitle>
                <mat-chip-set>
                  <mat-chip [color]="getStatusColor(interview.status)" selected>
                    {{ interview.status }}
                  </mat-chip>
                </mat-chip-set>
              </mat-card-header>

              <mat-card-content>
                <div class="interview-details">
                  <div class="detail-item">
                    <span>{{ interview.date }}</span>
                  </div>
                  <div class="detail-item">
                    <span>{{ interview.type }}</span>
                  </div>
                </div>

                <mat-divider></mat-divider>

                <div class="notes-section" *ngIf="interview.notes">
                  <h4>Notes</h4>
                  <p>{{ interview.notes }}</p>
                </div>
              </mat-card-content>

              <mat-card-actions>
                <button mat-button color="primary">View Feedback</button>
              </mat-card-actions>
            </mat-card>
          </div>
        </mat-tab>
      </mat-tab-group>
    </div>
  `,
  styles: [
    `
      .interviews-container {
        padding: 20px;
        max-width: 1200px;
        margin: 0 auto;
      }

      .header-card {
        margin-bottom: 20px;
      }

      .interview-list {
        padding: 20px 0;
      }

      .interview-card {
        margin-bottom: 20px;
      }

      .interview-details {
        display: flex;
        gap: 24px;
        margin: 16px 0;
      }

      .detail-item {
        display: flex;
        align-items: center;
        gap: 8px;
        color: rgba(0, 0, 0, 0.6);
      }

      .detail-item mat-icon {
        font-size: 20px;
        width: 20px;
        height: 20px;
      }

      .preparation-section,
      .notes-section {
        margin-top: 16px;
      }

      .preparation-section h4,
      .notes-section h4 {
        color: rgba(0, 0, 0, 0.87);
        font-size: 16px;
        margin-bottom: 8px;
      }

      .preparation-section ul {
        list-style-type: none;
        padding-left: 0;
      }

      .preparation-section li {
        margin-bottom: 4px;
        color: rgba(0, 0, 0, 0.6);
      }

      .notes-section p {
        color: rgba(0, 0, 0, 0.6);
        font-size: 14px;
        line-height: 1.5;
      }

      mat-divider {
        margin: 16px 0;
      }

      mat-card-actions {
        padding: 8px;
        display: flex;
        gap: 8px;
      }

      @media (max-width: 768px) {
        .interview-details {
          flex-direction: column;
          gap: 12px;
        }
      }
    `,
  ],
})
export class InterviewsComponent {
  upcomingInterviews: Interview[] = [
    {
      id: 1,
      company: 'Tech Corp',
      position: 'Senior Frontend Developer',
      date: '2024-03-20',
      time: '10:00 AM',
      type: 'Technical',
      status: 'Scheduled',
      preparationMaterials: [
        'Review Angular fundamentals',
        'Practice system design questions',
        'Prepare questions about team structure',
      ],
      notes: 'Focus on recent projects and team leadership experience',
    },
    {
      id: 2,
      company: 'Innovation Labs',
      position: 'Full Stack Engineer',
      date: '2024-03-22',
      time: '2:00 PM',
      type: 'Culture Fit',
      status: 'Scheduled',
      preparationMaterials: [
        'Research company values',
        'Prepare collaboration examples',
      ],
    },
  ];

  pastInterviews: Interview[] = [
    {
      id: 3,
      company: 'Digital Solutions Inc',
      position: 'Frontend Developer',
      date: '2024-03-15',
      time: '11:00 AM',
      type: 'Technical',
      status: 'Completed',
      notes: 'Positive feedback on technical skills, follow-up expected',
    },
    {
      id: 4,
      company: 'StartUp Co',
      position: 'UI Developer',
      date: '2024-03-10',
      time: '3:00 PM',
      type: 'HR',
      status: 'Completed',
      notes: 'Discussion about remote work policies and team structure',
    },
  ];

  getStatusColor(status: string): string {
    switch (status) {
      case 'Scheduled':
        return 'primary';
      case 'Completed':
        return 'accent';
      case 'Cancelled':
        return 'warn';
      default:
        return '';
    }
  }
}
