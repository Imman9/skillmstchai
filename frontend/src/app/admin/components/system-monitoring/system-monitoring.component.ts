import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';

interface SystemMetric {
  name: string;
  value: number;
  unit: string;
  status: 'normal' | 'warning' | 'critical';
  trend: 'up' | 'down' | 'stable';
}

@Component({
  selector: 'app-system-monitoring',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatGridListModule,
    MatIconModule,
    MatProgressBarModule,
    MatButtonModule,
  ],
  template: `
    <div class="system-monitoring-container">
      <mat-grid-list cols="2" rowHeight="200px" gutterSize="16">
        <mat-grid-tile *ngFor="let metric of metrics">
          <mat-card class="metric-card">
            <mat-card-header>
              <mat-card-title>{{ metric.name }}</mat-card-title>
              <mat-card-subtitle>
                <mat-icon [class]="getTrendClass(metric.trend)">
                  {{ getTrendIcon(metric.trend) }}
                </mat-icon>
                {{ metric.value }} {{ metric.unit }}
              </mat-card-subtitle>
            </mat-card-header>
            <mat-card-content>
              <mat-progress-bar
                [mode]="'determinate'"
                [value]="metric.value"
                [color]="getStatusColor(metric.status)"
              >
              </mat-progress-bar>
            </mat-card-content>
            <mat-card-actions>
              <button mat-button color="primary" (click)="viewDetails(metric)">
                View Details
              </button>
            </mat-card-actions>
          </mat-card>
        </mat-grid-tile>
      </mat-grid-list>
    </div>
  `,
  styles: [
    `
      .system-monitoring-container {
        padding: 20px;
      }
      .metric-card {
        width: 100%;
        height: 100%;
      }
      .trend-up {
        color: #4caf50;
      }
      .trend-down {
        color: #f44336;
      }
      .trend-stable {
        color: #2196f3;
      }
    `,
  ],
})
export class SystemMonitoringComponent implements OnInit {
  metrics: SystemMetric[] = [
    {
      name: 'CPU Usage',
      value: 75,
      unit: '%',
      status: 'warning',
      trend: 'up',
    },
    {
      name: 'Memory Usage',
      value: 60,
      unit: '%',
      status: 'normal',
      trend: 'stable',
    },
    {
      name: 'Disk Space',
      value: 85,
      unit: '%',
      status: 'warning',
      trend: 'up',
    },
    {
      name: 'Network Traffic',
      value: 45,
      unit: 'Mbps',
      status: 'normal',
      trend: 'down',
    },
  ];

  constructor() {}

  ngOnInit(): void {
    // Load system metrics from backend
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'normal':
        return 'primary';
      case 'warning':
        return 'accent';
      case 'critical':
        return 'warn';
      default:
        return '';
    }
  }

  getTrendIcon(trend: string): string {
    switch (trend) {
      case 'up':
        return 'trending_up';
      case 'down':
        return 'trending_down';
      default:
        return 'trending_flat';
    }
  }

  getTrendClass(trend: string): string {
    return `trend-${trend}`;
  }

  viewDetails(metric: SystemMetric): void {
    console.log('View details for:', metric);
    // Implement detailed view functionality
  }
}
