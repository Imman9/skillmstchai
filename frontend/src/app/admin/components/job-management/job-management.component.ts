import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  status: 'active' | 'inactive';
  postedDate: Date;
}

@Component({
  selector: 'app-job-management',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  template: `
    <div class="max-w-6xl mx-auto p-6">
      <mat-card class="p-6">
        <mat-card-header class="mb-6">
          <mat-card-title class="text-2xl font-bold text-gray-800"
            >Job Management</mat-card-title
          >
        </mat-card-header>

        <div class="overflow-x-auto">
          <table mat-table [dataSource]="jobs" class="w-full">
            <ng-container matColumnDef="title">
              <th mat-header-cell *matHeaderCellDef>Title</th>
              <td mat-cell *matCellDef="let job">{{ job.title }}</td>
            </ng-container>

            <ng-container matColumnDef="company">
              <th mat-header-cell *matHeaderCellDef>Company</th>
              <td mat-cell *matCellDef="let job">{{ job.company }}</td>
            </ng-container>

            <ng-container matColumnDef="location">
              <th mat-header-cell *matHeaderCellDef>Location</th>
              <td mat-cell *matCellDef="let job">{{ job.location }}</td>
            </ng-container>

            <ng-container matColumnDef="status">
              <th mat-header-cell *matHeaderCellDef>Status</th>
              <td mat-cell *matCellDef="let job">
                <span
                  [ngClass]="{
                    'text-green-600': job.status === 'active',
                    'text-red-600': job.status === 'inactive'
                  }"
                >
                  {{ job.status }}
                </span>
              </td>
            </ng-container>

            <ng-container matColumnDef="actions">
              <th mat-header-cell *matHeaderCellDef>Actions</th>
              <td mat-cell *matCellDef="let job">
                <button mat-icon-button color="primary">
                  <mat-icon>edit</mat-icon>
                </button>
                <button mat-icon-button color="warn">
                  <mat-icon>delete</mat-icon>
                </button>
              </td>
            </ng-container>

            <tr
              mat-header-row
              *matHeaderRowDef="[
                'title',
                'company',
                'location',
                'status',
                'actions'
              ]"
            ></tr>
            <tr
              mat-row
              *matRowDef="
                let row;
                columns: ['title', 'company', 'location', 'status', 'actions']
              "
            ></tr>
          </table>
        </div>
      </mat-card>
    </div>
  `,
})
export class JobManagementComponent implements OnInit {
  jobs: Job[] = [
    {
      id: '1',
      title: 'Senior Software Engineer',
      company: 'Tech Corp',
      location: 'Remote',
      status: 'active',
      postedDate: new Date(),
    },
    {
      id: '2',
      title: 'Product Manager',
      company: 'Innovate Inc',
      location: 'New York',
      status: 'active',
      postedDate: new Date(),
    },
  ];

  ngOnInit(): void {
    // Load jobs from localStorage if available
    const savedJobs = localStorage.getItem('adminJobs');
    if (savedJobs) {
      this.jobs = JSON.parse(savedJobs);
    }
  }
}
