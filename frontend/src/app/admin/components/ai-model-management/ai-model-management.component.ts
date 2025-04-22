import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';

interface AIModel {
  id: string;
  name: string;
  type: string;
  status: string;
  trainingProgress: number;
  accuracy: number;
  precision: number;
  recall: number;
  features: string[];
  lastUpdated: Date;
}

@Component({
  selector: 'app-ai-model-management',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatChipsModule,
    MatProgressBarModule,
    MatTooltipModule,
    MatDialogModule,
  ],
  template: `
    <div class="ai-model-management-container">
      <h2>AI Model Management</h2>
      <div class="model-list">
        <mat-card *ngFor="let model of models" class="model-card">
          <mat-card-header>
            <mat-card-title>{{ model.name }}</mat-card-title>
            <mat-card-subtitle>{{ model.type }}</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <div class="model-status">
              <span>Status: {{ model.status }}</span>
              <mat-progress-bar
                [mode]="'determinate'"
                [value]="model.trainingProgress"
              >
              </mat-progress-bar>
            </div>
            <div class="model-metrics">
              <div class="metric">
                <span>Accuracy: {{ model.accuracy }}%</span>
              </div>
              <div class="metric">
                <span>Precision: {{ model.precision }}%</span>
              </div>
              <div class="metric">
                <span>Recall: {{ model.recall }}%</span>
              </div>
            </div>
            <div class="model-features">
              <mat-chip-set>
                <mat-chip *ngFor="let feature of model.features">
                  {{ feature }}
                </mat-chip>
              </mat-chip-set>
            </div>
            <div class="last-updated">
              Last Updated: {{ model.lastUpdated | date }}
            </div>
          </mat-card-content>
          <mat-card-actions>
            <button mat-button color="primary" (click)="retrainModel(model)">
              Train
            </button>
            <button mat-button color="accent" (click)="deployModel(model)">
              Deploy
            </button>
            <button mat-button color="warn" (click)="deleteModel(model)">
              Delete
            </button>
          </mat-card-actions>
        </mat-card>
      </div>
    </div>
  `,
  styles: [
    `
      .ai-model-management-container {
        padding: 20px;
      }
      .model-list {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 20px;
        margin-top: 20px;
      }
      .model-card {
        height: 100%;
      }
      .model-status {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
      }
      .model-metrics {
        margin: 10px 0;
      }
      .model-features {
        margin-top: 10px;
      }
      mat-card-actions {
        display: flex;
        justify-content: space-between;
      }
    `,
  ],
})
export class AIModelManagementComponent implements OnInit {
  models: AIModel[] = [
    {
      id: '1',
      name: 'Job Matching Model',
      type: 'Recommendation',
      status: 'Active',
      trainingProgress: 100,
      accuracy: 92.5,
      precision: 89.3,
      recall: 91.8,
      features: ['Skills', 'Experience', 'Education', 'Location'],
      lastUpdated: new Date('2024-03-15'),
    },
    {
      id: '2',
      name: 'Resume Analysis Model',
      type: 'NLP',
      status: 'Training',
      trainingProgress: 75,
      accuracy: 88.3,
      precision: 85.7,
      recall: 87.2,
      features: ['Text Analysis', 'Keyword Extraction', 'Format Detection'],
      lastUpdated: new Date('2024-03-10'),
    },
  ];

  constructor() {}

  ngOnInit(): void {}

  retrainModel(model: AIModel): void {
    console.log('Retraining model:', model);
    // Implement retrain functionality
  }

  deployModel(model: AIModel): void {
    console.log('Deploying model:', model);
    // Implement deploy functionality
  }

  deleteModel(model: AIModel): void {
    console.log('Deleting model:', model);
    // Implement delete functionality
  }
}
