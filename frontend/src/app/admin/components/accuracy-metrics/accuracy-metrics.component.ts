import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';

interface Metric {
  id: string;
  name: string;
  value: number;
  target: number;
  trend: 'up' | 'down' | 'stable';
  lastUpdated: Date;
}

@Component({
  selector: 'app-accuracy-metrics',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
  ],
  template: `
    <div class="max-w-6xl mx-auto p-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Metrics Overview -->
        <mat-card class="p-6">
          <mat-card-header class="mb-6">
            <mat-card-title class="text-2xl font-bold text-gray-800"
              >Accuracy Metrics Overview</mat-card-title
            >
          </mat-card-header>

          <div class="space-y-4">
            <div class="flex justify-between items-center">
              <div>
                <h3 class="text-lg font-semibold">Job Matching Accuracy</h3>
                <p class="text-gray-600">
                  How well jobs match candidate skills
                </p>
              </div>
              <div class="text-right">
                <p class="text-3xl font-bold text-green-600">85%</p>
                <p class="text-sm text-gray-500">+2% from last month</p>
              </div>
            </div>

            <div class="flex justify-between items-center">
              <div>
                <h3 class="text-lg font-semibold">Skill Assessment Accuracy</h3>
                <p class="text-gray-600">Accuracy of skill level assessments</p>
              </div>
              <div class="text-right">
                <p class="text-3xl font-bold text-blue-600">92%</p>
                <p class="text-sm text-gray-500">+1% from last month</p>
              </div>
            </div>

            <div class="flex justify-between items-center">
              <div>
                <h3 class="text-lg font-semibold">Recommendation Accuracy</h3>
                <p class="text-gray-600">Quality of learning recommendations</p>
              </div>
              <div class="text-right">
                <p class="text-3xl font-bold text-purple-600">78%</p>
                <p class="text-sm text-gray-500">-3% from last month</p>
              </div>
            </div>
          </div>
        </mat-card>

        <!-- Detailed Metrics -->
        <mat-card class="p-6">
          <mat-card-header class="mb-6">
            <mat-card-title class="text-2xl font-bold text-gray-800"
              >Detailed Metrics</mat-card-title
            >
          </mat-card-header>

          <div class="space-y-4">
            <div class="flex justify-between items-center">
              <mat-form-field class="w-1/2">
                <mat-label>Time Period</mat-label>
                <mat-select [(ngModel)]="selectedPeriod">
                  <mat-option value="7">Last 7 days</mat-option>
                  <mat-option value="30">Last 30 days</mat-option>
                  <mat-option value="90">Last 90 days</mat-option>
                </mat-select>
              </mat-form-field>

              <mat-form-field class="w-1/2">
                <mat-label>Metric Type</mat-label>
                <mat-select [(ngModel)]="selectedMetric">
                  <mat-option value="all">All Metrics</mat-option>
                  <mat-option value="matching">Job Matching</mat-option>
                  <mat-option value="assessment">Skill Assessment</mat-option>
                  <mat-option value="recommendation"
                    >Recommendations</mat-option
                  >
                </mat-select>
              </mat-form-field>
            </div>

            <div class="overflow-x-auto">
              <table mat-table [dataSource]="metrics" class="w-full">
                <ng-container matColumnDef="name">
                  <th mat-header-cell *matHeaderCellDef>Metric</th>
                  <td mat-cell *matCellDef="let metric">{{ metric.name }}</td>
                </ng-container>

                <ng-container matColumnDef="value">
                  <th mat-header-cell *matHeaderCellDef>Value</th>
                  <td mat-cell *matCellDef="let metric">
                    <span
                      [ngClass]="{
                        'text-green-600': metric.value >= metric.target,
                        'text-red-600': metric.value < metric.target
                      }"
                    >
                      {{ metric.value }}%
                    </span>
                  </td>
                </ng-container>

                <ng-container matColumnDef="trend">
                  <th mat-header-cell *matHeaderCellDef>Trend</th>
                  <td mat-cell *matCellDef="let metric">
                    <mat-icon
                      [ngClass]="{
                        'text-green-600': metric.trend === 'up',
                        'text-red-600': metric.trend === 'down',
                        'text-gray-600': metric.trend === 'stable'
                      }"
                    >
                      {{
                        metric.trend === 'up'
                          ? 'trending_up'
                          : metric.trend === 'down'
                          ? 'trending_down'
                          : 'trending_flat'
                      }}
                    </mat-icon>
                  </td>
                </ng-container>

                <tr
                  mat-header-row
                  *matHeaderRowDef="['name', 'value', 'trend']"
                ></tr>
                <tr
                  mat-row
                  *matRowDef="let row; columns: ['name', 'value', 'trend']"
                ></tr>
              </table>
            </div>
          </div>
        </mat-card>
      </div>
    </div>
  `,
})
export class AccuracyMetricsComponent implements OnInit {
  selectedPeriod = '30';
  selectedMetric = 'all';

  metrics: Metric[] = [
    {
      id: '1',
      name: 'Job Matching Accuracy',
      value: 85,
      target: 80,
      trend: 'up',
      lastUpdated: new Date(),
    },
    {
      id: '2',
      name: 'Skill Assessment Accuracy',
      value: 92,
      target: 90,
      trend: 'up',
      lastUpdated: new Date(),
    },
    {
      id: '3',
      name: 'Recommendation Accuracy',
      value: 78,
      target: 85,
      trend: 'down',
      lastUpdated: new Date(),
    },
  ];

  ngOnInit(): void {
    // Load metrics data from localStorage if available
    const savedMetrics = localStorage.getItem('accuracyMetrics');
    if (savedMetrics) {
      this.metrics = JSON.parse(savedMetrics);
    }
  }
}
