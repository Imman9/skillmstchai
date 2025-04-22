import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';

interface Application {
  id: string;
  jobTitle: string;
  company: string;
  appliedDate: Date;
  status: 'Pending' | 'Reviewed' | 'Interview' | 'Rejected' | 'Accepted';
  lastUpdated: Date;
}

@Component({
  selector: 'app-applications',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatCardModule,
    MatTooltipModule,
  ],
  template: `
    <div class="applications-container">
      <mat-card class="elevated-card">
        <mat-card-header>
          <mat-card-title>Your Applications</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <table
            mat-table
            [dataSource]="applications"
            class="mat-elevation-z2 applications-table"
          >
            <!-- Job Title -->
            <ng-container matColumnDef="jobTitle">
              <th mat-header-cell *matHeaderCellDef>Job Title</th>
              <td mat-cell *matCellDef="let application">
                <strong>{{ application.jobTitle }}</strong>
              </td>
            </ng-container>

            <!-- Company -->
            <ng-container matColumnDef="company">
              <th mat-header-cell *matHeaderCellDef>Company</th>
              <td mat-cell *matCellDef="let application">
                {{ application.company }}
              </td>
            </ng-container>

            <!-- Applied Date -->
            <ng-container matColumnDef="appliedDate">
              <th mat-header-cell *matHeaderCellDef>Applied</th>
              <td mat-cell *matCellDef="let application">
                {{ application.appliedDate | date : 'mediumDate' }}
              </td>
            </ng-container>

            <!-- Status -->
            <ng-container matColumnDef="status">
              <th mat-header-cell *matHeaderCellDef>Status</th>
              <td mat-cell *matCellDef="let application">
                <mat-chip
                  [color]="getStatusColor(application.status)"
                  selected
                  class="status-chip"
                >
                  {{ application.status }}
                </mat-chip>
              </td>
            </ng-container>

            <!-- Actions -->
            <ng-container matColumnDef="actions">
              <th mat-header-cell *matHeaderCellDef>Actions</th>
              <td mat-cell *matCellDef="let application">
                <!-- Replace mat-icon with Font Awesome -->
                <button
                  mat-icon-button
                  color="primary"
                  matTooltip="View Details"
                  (click)="viewDetails(application)"
                >
                  <i class="fas fa-eye"></i>
                </button>

                <button
                  mat-icon-button
                  color="warn"
                  matTooltip="Withdraw"
                  (click)="withdrawApplication(application)"
                >
                  <i class="fas fa-trash-alt"></i>
                </button>
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
      .applications-container {
        padding: 16px;
        width: 100%;
        overflow-x: auto;
      }

      .elevated-card {
        border-radius: 12px;
        box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
      }

      .applications-table {
        width: 100%;
        min-width: 600px;
        border-collapse: collapse;
      }
      @media (max-width: 768px) {
        .applications-container {
          padding: 8px;
        }

        .mat-header-cell,
        .mat-cell {
          padding: 8px 12px;
          font-size: 14px;
        }

        .status-chip {
          font-size: 12px;
        }
      }
    `,
  ],
})
export class ApplicationsComponent implements OnInit {
  displayedColumns: string[] = [
    'jobTitle',
    'company',
    'appliedDate',
    'status',
    'actions',
  ];
  applications: Application[] = [
    {
      id: '1',
      jobTitle: 'Senior Frontend Developer',
      company: 'TechCorp',
      appliedDate: new Date('2024-03-15'),
      status: 'Interview',
      lastUpdated: new Date('2024-03-20'),
    },
    {
      id: '2',
      jobTitle: 'Full Stack Developer',
      company: 'InnovateSoft',
      appliedDate: new Date('2024-03-10'),
      status: 'Pending',
      lastUpdated: new Date('2024-03-10'),
    },
  ];

  constructor() {}

  ngOnInit(): void {
    // Load applications from backend
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'Accepted':
        return 'primary';
      case 'Interview':
        return 'accent';
      case 'Rejected':
        return 'warn';
      case 'Reviewed':
        return 'accent';
      case 'Pending':
      default:
        return '';
    }
  }

  viewDetails(application: Application): void {
    console.log('View details for application:', application);
    // Navigate to application details
  }

  withdrawApplication(application: Application): void {
    console.log('Withdraw application:', application);
    // Implement withdrawal logic
  }
}
