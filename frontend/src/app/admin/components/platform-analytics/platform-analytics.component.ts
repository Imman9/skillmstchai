import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

interface AnalyticsMetric {
  name: string;
  value: number;
  change: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
}

interface TimeRange {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-platform-analytics',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatGridListModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
  ],
  template: `
    <div class="platform-analytics-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Platform Analytics</mat-card-title>
          <mat-form-field>
            <mat-label>Time Range</mat-label>
            <mat-select [(value)]="selectedTimeRange">
              <mat-option
                *ngFor="let range of timeRanges"
                [value]="range.value"
              >
                {{ range.viewValue }}
              </mat-option>
            </mat-select>
          </mat-form-field>
        </mat-card-header>
        <mat-card-content>
          <mat-grid-list cols="2" rowHeight="200px" gutterSize="16">
            <mat-grid-tile *ngFor="let metric of metrics">
              <mat-card class="metric-card">
                <mat-card-header>
                  <mat-card-title>{{ metric.name }}</mat-card-title>
                  <mat-card-subtitle>
                    <mat-icon [class]="getTrendClass(metric.trend)">
                      {{ getTrendIcon(metric.trend) }}
                    </mat-icon>
                    {{ metric.change }}% change
                  </mat-card-subtitle>
                </mat-card-header>
                <mat-card-content>
                  <div class="metric-value">
                    {{ metric.value }} {{ metric.unit }}
                  </div>
                </mat-card-content>
              </mat-card>
            </mat-grid-tile>
          </mat-grid-list>
        </mat-card-content>
        <mat-card-actions>
          <button mat-button color="primary" (click)="exportData()">
            <mat-icon>download</mat-icon>
            Export Data
          </button>
          <button mat-button color="accent" (click)="refreshData()">
            <mat-icon>refresh</mat-icon>
            Refresh
          </button>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styles: [
    `
      .platform-analytics-container {
        padding: 20px;
      }
      .metric-card {
        width: 100%;
        height: 100%;
      }
      .metric-value {
        font-size: 2em;
        font-weight: bold;
        text-align: center;
        margin-top: 20px;
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
      mat-card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    `,
  ],
})
export class PlatformAnalyticsComponent implements OnInit {
  selectedTimeRange = '7d';
  timeRanges: TimeRange[] = [
    { value: '24h', viewValue: 'Last 24 Hours' },
    { value: '7d', viewValue: 'Last 7 Days' },
    { value: '30d', viewValue: 'Last 30 Days' },
    { value: '90d', viewValue: 'Last 90 Days' },
  ];

  metrics: AnalyticsMetric[] = [
    {
      name: 'Active Users',
      value: 1250,
      change: 12.5,
      unit: 'users',
      trend: 'up',
    },
    {
      name: 'Job Postings',
      value: 342,
      change: -3.2,
      unit: 'jobs',
      trend: 'down',
    },
    {
      name: 'Applications',
      value: 1256,
      change: 8.7,
      unit: 'applications',
      trend: 'up',
    },
    {
      name: 'Matches Made',
      value: 89,
      change: 0,
      unit: 'matches',
      trend: 'stable',
    },
  ];

  constructor() {}

  ngOnInit(): void {
    // Load analytics data from backend
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

  exportData(): void {
    console.log('Export analytics data');
    // Implement export functionality
  }

  refreshData(): void {
    console.log('Refresh analytics data');
    // Implement refresh functionality
  }
}
