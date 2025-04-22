import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';

interface JobListing {
  id: number;
  title: string;
  department: string;
  location: string;
  type: string;
  status: string;
  applicants: number;
  posted: string;
}

@Component({
  selector: 'app-active-listings',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatChipsModule,
    MatCardModule,
  ],
  template: `
    <div class="listings-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Active Job Listings</mat-card-title>
          <mat-card-subtitle
            >Manage your current job postings</mat-card-subtitle
          >
        </mat-card-header>
        <mat-card-content>
          <table mat-table [dataSource]="jobListings" class="mat-elevation-z0">
            <ng-container matColumnDef="title">
              <th mat-header-cell *matHeaderCellDef>Position</th>
              <td mat-cell *matCellDef="let job">{{ job.title }}</td>
            </ng-container>

            <ng-container matColumnDef="department">
              <th mat-header-cell *matHeaderCellDef>Department</th>
              <td mat-cell *matCellDef="let job">{{ job.department }}</td>
            </ng-container>

            <ng-container matColumnDef="location">
              <th mat-header-cell *matHeaderCellDef>Location</th>
              <td mat-cell *matCellDef="let job">{{ job.location }}</td>
            </ng-container>

            <ng-container matColumnDef="type">
              <th mat-header-cell *matHeaderCellDef>Type</th>
              <td mat-cell *matCellDef="let job">
                <mat-chip-set>
                  <mat-chip>{{ job.type }}</mat-chip>
                </mat-chip-set>
              </td>
            </ng-container>

            <ng-container matColumnDef="status">
              <th mat-header-cell *matHeaderCellDef>Status</th>
              <td mat-cell *matCellDef="let job">
                <mat-chip-set>
                  <mat-chip
                    [color]="job.status === 'Active' ? 'primary' : 'warn'"
                    selected
                  >
                    {{ job.status }}
                  </mat-chip>
                </mat-chip-set>
              </td>
            </ng-container>

            <ng-container matColumnDef="applicants">
              <th mat-header-cell *matHeaderCellDef>Applicants</th>
              <td mat-cell *matCellDef="let job">{{ job.applicants }}</td>
            </ng-container>

            <ng-container matColumnDef="posted">
              <th mat-header-cell *matHeaderCellDef>Posted</th>
              <td mat-cell *matCellDef="let job">{{ job.posted }}</td>
            </ng-container>

            <ng-container matColumnDef="actions">
              <th mat-header-cell *matHeaderCellDef>Actions</th>
              <td mat-cell *matCellDef="let job">
                <button mat-button color="primary">Edit</button>
                <button mat-button color="warn">Close</button>
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
      .listings-container {
        padding: 20px;
      }
      table {
        width: 100%;
      }
      .mat-column-actions {
        width: 120px;
      }
      .mat-card-header {
        margin-bottom: 20px;
      }
      .mat-card-title {
        font-size: 24px;
        font-weight: 500;
      }
      .mat-card-subtitle {
        font-size: 16px;
      }
      .mat-chip-set {
        display: inline-block;
      }
    `,
  ],
})
export class ActiveListingsComponent {
  displayedColumns: string[] = [
    'title',
    'department',
    'location',
    'type',
    'status',
    'applicants',
    'posted',
    'actions',
  ];

  jobListings: JobListing[] = [
    {
      id: 1,
      title: 'Senior Frontend Developer',
      department: 'Engineering',
      location: 'Remote',
      type: 'Full-time',
      status: 'Active',
      applicants: 12,
      posted: '2024-03-01',
    },
    {
      id: 2,
      title: 'Product Manager',
      department: 'Product',
      location: 'New York, NY',
      type: 'Full-time',
      status: 'Active',
      applicants: 8,
      posted: '2024-03-05',
    },
    {
      id: 3,
      title: 'UX Designer',
      department: 'Design',
      location: 'San Francisco, CA',
      type: 'Contract',
      status: 'Paused',
      applicants: 5,
      posted: '2024-03-10',
    },
  ];
}
