import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';

interface Interview {
  id: string;
  candidateName: string;
  position: string;
  date: Date;
  time: string;
  type: 'phone' | 'video' | 'in-person';
  status: 'scheduled' | 'completed' | 'cancelled';
  interviewer: string;
  notes?: string;
}

@Component({
  selector: 'app-manage-interviews',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatChipsModule,
    MatMenuModule,
    MatTooltipModule,
  ],
  template: `
    <div class="interviews-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Interview Management</mat-card-title>
          <button
            mat-raised-button
            color="primary"
            (click)="scheduleInterview()"
          >
            Schedule Interview
          </button>
        </mat-card-header>
        <mat-card-content>
          <table mat-table [dataSource]="interviews" class="interviews-table">
            <ng-container matColumnDef="candidateName">
              <th mat-header-cell *matHeaderCellDef>Candidate</th>
              <td mat-cell *matCellDef="let interview">
                {{ interview.candidateName }}
              </td>
            </ng-container>

            <ng-container matColumnDef="position">
              <th mat-header-cell *matHeaderCellDef>Position</th>
              <td mat-cell *matCellDef="let interview">
                {{ interview.position }}
              </td>
            </ng-container>

            <ng-container matColumnDef="date">
              <th mat-header-cell *matHeaderCellDef>Date</th>
              <td mat-cell *matCellDef="let interview">
                {{ interview.date | date : 'mediumDate' }}
              </td>
            </ng-container>

            <ng-container matColumnDef="time">
              <th mat-header-cell *matHeaderCellDef>Time</th>
              <td mat-cell *matCellDef="let interview">{{ interview.time }}</td>
            </ng-container>

            <ng-container matColumnDef="type">
              <th mat-header-cell *matHeaderCellDef>Type</th>
              <td mat-cell *matCellDef="let interview">
                <mat-chip [color]="getTypeColor(interview.type)" selected>
                  {{ interview.type }}
                </mat-chip>
              </td>
            </ng-container>

            <ng-container matColumnDef="status">
              <th mat-header-cell *matHeaderCellDef>Status</th>
              <td mat-cell *matCellDef="let interview">
                <mat-chip [color]="getStatusColor(interview.status)" selected>
                  {{ interview.status }}
                </mat-chip>
              </td>
            </ng-container>

            <ng-container matColumnDef="interviewer">
              <th mat-header-cell *matHeaderCellDef>Interviewer</th>
              <td mat-cell *matCellDef="let interview">
                {{ interview.interviewer }}
              </td>
            </ng-container>

            <ng-container matColumnDef="actions">
              <th mat-header-cell *matHeaderCellDef>Actions</th>
              <td mat-cell *matCellDef="let interview">
                <button
                  mat-icon-button
                  [matMenuTriggerFor]="menu"
                  matTooltip="Actions"
                >
                  <i class="fas fa-ellipsis-v"></i>
                </button>
                <mat-menu #menu="matMenu">
                  <button mat-menu-item (click)="viewDetails(interview)">
                    <span>View Details</span>
                  </button>
                  <button mat-menu-item (click)="editInterview(interview)">
                    <span>Edit</span>
                  </button>
                  <button
                    mat-menu-item
                    (click)="cancelInterview(interview)"
                    *ngIf="interview.status === 'scheduled'"
                  >
                    <span>Cancel</span>
                  </button>
                  <button
                    mat-menu-item
                    (click)="completeInterview(interview)"
                    *ngIf="interview.status === 'scheduled'"
                  >
                    <span>Complete</span>
                  </button>
                </mat-menu>
              </td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
          </table>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [
    `
      .interviews-container {
        padding: 20px;
      }
      .interviews-table {
        width: 100%;
      }
      mat-card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      mat-chip {
        text-transform: capitalize;
      }
    `,
  ],
})
export class ManageInterviewsComponent implements OnInit {
  displayedColumns: string[] = [
    'candidateName',
    'position',
    'date',
    'time',
    'type',
    'status',
    'interviewer',
    'actions',
  ];

  interviews: Interview[] = [
    {
      id: '1',
      candidateName: 'John Doe',
      position: 'Senior Frontend Developer',
      date: new Date('2024-03-25'),
      time: '10:00 AM',
      type: 'video',
      status: 'scheduled',
      interviewer: 'Sarah Johnson',
      notes: 'Technical interview focusing on Angular and TypeScript',
    },
    {
      id: '2',
      candidateName: 'Jane Smith',
      position: 'Full Stack Developer',
      date: new Date('2024-03-26'),
      time: '2:00 PM',
      type: 'in-person',
      status: 'scheduled',
      interviewer: 'Mike Brown',
      notes: 'System design and problem-solving interview',
    },
    {
      id: '3',
      candidateName: 'Alex Johnson',
      position: 'UX Designer',
      date: new Date('2024-03-20'),
      time: '11:30 AM',
      type: 'phone',
      status: 'completed',
      interviewer: 'Emily Davis',
      notes: 'Excellent design skills and problem-solving approach',
    },
  ];

  constructor() {}

  ngOnInit(): void {}

  getTypeColor(type: string): string {
    switch (type) {
      case 'video':
        return 'primary';
      case 'in-person':
        return 'accent';
      case 'phone':
        return 'warn';
      default:
        return '';
    }
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'scheduled':
        return 'primary';
      case 'completed':
        return 'accent';
      case 'cancelled':
        return 'warn';
      default:
        return '';
    }
  }

  scheduleInterview(): void {
    console.log('Schedule new interview');
    // Implement in your preferred way
  }

  viewDetails(interview: Interview): void {
    console.log('View details:', interview);
  }

  editInterview(interview: Interview): void {
    console.log('Edit interview:', interview);
  }

  cancelInterview(interview: Interview): void {
    console.log('Cancel interview:', interview);
    interview.status = 'cancelled';
  }

  completeInterview(interview: Interview): void {
    console.log('Complete interview:', interview);
    interview.status = 'completed';
  }
}
