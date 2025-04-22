import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';

interface User {
  id: string;
  email: string;
  role: 'JOB_SEEKER' | 'EMPLOYER' | 'ADMIN';
  status: 'active' | 'inactive' | 'suspended';
  createdAt: Date;
  lastLogin: Date;
}

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatCardModule,
    MatDialogModule,
    MatMenuModule,
  ],
  template: `
    <div class="user-management-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>User Management</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <table mat-table [dataSource]="users" class="users-table">
            <ng-container matColumnDef="email">
              <th mat-header-cell *matHeaderCellDef>Email</th>
              <td mat-cell *matCellDef="let user">{{ user.email }}</td>
            </ng-container>

            <ng-container matColumnDef="role">
              <th mat-header-cell *matHeaderCellDef>Role</th>
              <td mat-cell *matCellDef="let user">
                <mat-chip [color]="getRoleColor(user.role)">
                  {{ user.role }}
                </mat-chip>
              </td>
            </ng-container>

            <ng-container matColumnDef="status">
              <th mat-header-cell *matHeaderCellDef>Status</th>
              <td mat-cell *matCellDef="let user">
                <mat-chip [color]="getStatusColor(user.status)">
                  {{ user.status }}
                </mat-chip>
              </td>
            </ng-container>

            <ng-container matColumnDef="createdAt">
              <th mat-header-cell *matHeaderCellDef>Created At</th>
              <td mat-cell *matCellDef="let user">
                {{ user.createdAt | date }}
              </td>
            </ng-container>

            <ng-container matColumnDef="lastLogin">
              <th mat-header-cell *matHeaderCellDef>Last Login</th>
              <td mat-cell *matCellDef="let user">
                {{ user.lastLogin | date }}
              </td>
            </ng-container>

            <ng-container matColumnDef="actions">
              <th mat-header-cell *matHeaderCellDef>Actions</th>
              <td mat-cell *matCellDef="let user">
                <button mat-icon-button [matMenuTriggerFor]="menu">
                  <i class="	fas fa-ellipsis-v"></i>
                </button>
                <mat-menu #menu="matMenu">
                  <button mat-menu-item (click)="editUser(user)">
                    <span>Edit</span>
                  </button>
                  <button mat-menu-item (click)="suspendUser(user)">
                    <span>Suspend</span>
                  </button>
                  <button mat-menu-item (click)="deleteUser(user)">
                    <span>Delete</span>
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
      .user-management-container {
        padding: 20px;
        max-width: 1200px;
        margin: 0 auto;
      }
      .users-table {
        width: 100%;
      }
      mat-card {
        padding: 20px;
        box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
      }
      .users-table {
        width: 100%;
        overflow-x: auto;
        margin-top: 20px;
      }
      mat-header-cell,
      mat-cell {
        padding: 10px;
        text-align: left;
      }

      mat-header-row,
      mat-row {
        display: table-row;
      }

      mat-header-cell {
        font-weight: bold;
        background-color: #f4f4f4;
      }

      /* Make the actions menu button smaller for mobile */
      button[mat-icon-button] i {
        font-size: 18px;
      }

      /* Responsive design for small screens */
      @media screen and (max-width: 768px) {
        .users-table {
          display: block;
          overflow-x: auto;
        }

        .users-table mat-header-cell,
        .users-table mat-cell {
          font-size: 14px;
        }

        mat-card {
          padding: 10px;
        }

        .user-management-container {
          padding: 15px;
        }

        /* Stacking the table for small screens (Mobile-first approach) */
        .users-table {
          display: block;
        }

        .users-table mat-row {
          display: block;
          margin-bottom: 10px;
        }

        .users-table mat-header-row {
          display: none; /* Hide headers in mobile */
        }

        .users-table mat-row mat-cell {
          display: flex;
          flex-direction: column;
          padding: 10px;
          border: 1px solid #ddd;
          margin-bottom: 10px;
        }

        .users-table mat-row mat-cell .mat-chip {
          margin-top: 10px;
        }

        /* Hide some columns for smaller screens */
        .users-table mat-column-createdAt,
        .users-table mat-column-lastLogin {
          display: none;
        }
      }

      /* Further adjustments for smaller mobile screens */
      @media screen and (max-width: 480px) {
        .users-table mat-row mat-cell {
          font-size: 12px;
        }

        /* Icon size adjustment for small screens */
        button[mat-icon-button] i {
          font-size: 16px;
        }
      }
    `,
  ],
})
export class UserManagementComponent implements OnInit {
  displayedColumns: string[] = [
    'email',
    'role',
    'status',
    'createdAt',
    'lastLogin',
    'actions',
  ];
  users: User[] = [
    {
      id: '1',
      email: 'jobseeker@example.com',
      role: 'JOB_SEEKER',
      status: 'active',
      createdAt: new Date('2024-01-01'),
      lastLogin: new Date('2024-03-20'),
    },
    {
      id: '2',
      email: 'employer@example.com',
      role: 'EMPLOYER',
      status: 'active',
      createdAt: new Date('2024-01-15'),
      lastLogin: new Date('2024-03-19'),
    },
  ];

  constructor() {}

  ngOnInit(): void {
    // Load users from backend
  }

  getRoleColor(role: string): string {
    switch (role) {
      case 'ADMIN':
        return 'primary';
      case 'EMPLOYER':
        return 'accent';
      default:
        return '';
    }
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'active':
        return 'primary';
      case 'suspended':
        return 'warn';
      default:
        return '';
    }
  }

  editUser(user: User): void {
    console.log('Edit user:', user);
    // Implement edit functionality
  }

  suspendUser(user: User): void {
    console.log('Suspend user:', user);
    // Implement suspend functionality
  }

  deleteUser(user: User): void {
    console.log('Delete user:', user);
    // Implement delete functionality
  }
}
