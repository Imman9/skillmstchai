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
import { MatChipsModule } from '@angular/material/chips';

interface Skill {
  id: string;
  name: string;
  category: string;
  description: string;
  status: 'active' | 'inactive';
}

@Component({
  selector: 'app-skill-management',
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
    MatChipsModule,
  ],
  template: `
    <div class="max-w-6xl mx-auto p-6">
      <mat-card class="p-6">
        <mat-card-header class="mb-6">
          <mat-card-title class="text-2xl font-bold text-gray-800"
            >Skill Management</mat-card-title
          >
        </mat-card-header>

        <div class="overflow-x-auto">
          <table mat-table [dataSource]="skills" class="w-full">
            <ng-container matColumnDef="name">
              <th mat-header-cell *matHeaderCellDef>Name</th>
              <td mat-cell *matCellDef="let skill">{{ skill.name }}</td>
            </ng-container>

            <ng-container matColumnDef="category">
              <th mat-header-cell *matHeaderCellDef>Category</th>
              <td mat-cell *matCellDef="let skill">{{ skill.category }}</td>
            </ng-container>

            <ng-container matColumnDef="description">
              <th mat-header-cell *matHeaderCellDef>Description</th>
              <td mat-cell *matCellDef="let skill">{{ skill.description }}</td>
            </ng-container>

            <ng-container matColumnDef="status">
              <th mat-header-cell *matHeaderCellDef>Status</th>
              <td mat-cell *matCellDef="let skill">
                <span
                  [ngClass]="{
                    'text-green-600': skill.status === 'active',
                    'text-red-600': skill.status === 'inactive'
                  }"
                >
                  {{ skill.status }}
                </span>
              </td>
            </ng-container>

            <ng-container matColumnDef="actions">
              <th mat-header-cell *matHeaderCellDef>Actions</th>
              <td mat-cell *matCellDef="let skill">
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
                'name',
                'category',
                'description',
                'status',
                'actions'
              ]"
            ></tr>
            <tr
              mat-row
              *matRowDef="
                let row;
                columns: [
                  'name',
                  'category',
                  'description',
                  'status',
                  'actions'
                ]
              "
            ></tr>
          </table>
        </div>
      </mat-card>
    </div>
  `,
})
export class SkillManagementComponent implements OnInit {
  skills: Skill[] = [
    {
      id: '1',
      name: 'Angular',
      category: 'Frontend Development',
      description: 'Modern web framework',
      status: 'active',
    },
    {
      id: '2',
      name: 'Node.js',
      category: 'Backend Development',
      description: 'JavaScript runtime',
      status: 'active',
    },
  ];

  ngOnInit(): void {
    // Load skills from localStorage if available
    const savedSkills = localStorage.getItem('adminSkills');
    if (savedSkills) {
      this.skills = JSON.parse(savedSkills);
    }
  }
}
