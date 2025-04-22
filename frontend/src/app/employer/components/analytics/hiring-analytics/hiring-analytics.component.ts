import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';

interface MetricCard {
  title: string;
  value: string;
  change: number;
  icon: string;
}

interface JobMetrics {
  position: string;
  department: string;
  applicants: number;
  interviews: number;
  offers: number;
  hires: number;
  timeToHire: number;
}

@Component({
  selector: 'app-hiring-analytics',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatChipsModule,
    MatMenuModule,
  ],
  template: `
    <div class="analytics-container">
      <div class="metrics-grid">
        <mat-card *ngFor="let metric of metrics" class="metric-card">
          <div class="metric-icon">
            <i
              [class.positive]="metric.change > 0"
              [class.negative]="metric.change < 0"
              [ngClass]="{
                fa: true,
                'fa-arrow-up': metric.change > 0,
                'fa-arrow-down': metric.change < 0
              }"
            ></i>
          </div>
          <div class="metric-content">
            <div class="metric-title">{{ metric.title }}</div>
            <div class="metric-value">{{ metric.value }}</div>
            <div
              class="metric-change"
              [class.positive]="metric.change > 0"
              [class.negative]="metric.change < 0"
            >
              <i
                [ngClass]="{
                  fa: true,
                  'fa-arrow-up': metric.change > 0,
                  'fa-arrow-down': metric.change < 0
                }"
              ></i>
              {{ metric.change }}%
            </div>
          </div>
        </mat-card>
      </div>

      <div class="charts-grid">
        <mat-card class="chart-card">
          <mat-card-header>
            <mat-card-title>Hiring Funnel</mat-card-title>
            <mat-card-subtitle>Last 30 days</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <table mat-table [dataSource]="jobMetrics" class="funnel-table">
              <ng-container matColumnDef="position">
                <th mat-header-cell *matHeaderCellDef>Position</th>
                <td mat-cell *matCellDef="let job">
                  {{ job.position }}
                  <div class="department">{{ job.department }}</div>
                </td>
              </ng-container>

              <ng-container matColumnDef="applicants">
                <th mat-header-cell *matHeaderCellDef>Applicants</th>
                <td mat-cell *matCellDef="let job">{{ job.applicants }}</td>
              </ng-container>

              <ng-container matColumnDef="interviews">
                <th mat-header-cell *matHeaderCellDef>Interviews</th>
                <td mat-cell *matCellDef="let job">{{ job.interviews }}</td>
              </ng-container>

              <ng-container matColumnDef="offers">
                <th mat-header-cell *matHeaderCellDef>Offers</th>
                <td mat-cell *matCellDef="let job">{{ job.offers }}</td>
              </ng-container>

              <ng-container matColumnDef="hires">
                <th mat-header-cell *matHeaderCellDef>Hires</th>
                <td mat-cell *matCellDef="let job">{{ job.hires }}</td>
              </ng-container>

              <ng-container matColumnDef="timeToHire">
                <th mat-header-cell *matHeaderCellDef>Time to Hire</th>
                <td mat-cell *matCellDef="let job">
                  {{ job.timeToHire }} days
                </td>
              </ng-container>

              <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
              <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
            </table>
          </mat-card-content>
        </mat-card>

        <mat-card class="chart-card">
          <mat-card-header>
            <mat-card-title>Time to Hire Trend</mat-card-title>
            <mat-card-subtitle>Average days by department</mat-card-subtitle>
            <button
              mat-icon-button
              [matMenuTriggerFor]="timeMenu"
              class="more-button"
            >
              <mat-icon>more_vert</mat-icon>
            </button>
            <mat-menu #timeMenu="matMenu">
              <button mat-menu-item>Last 30 days</button>
              <button mat-menu-item>Last 90 days</button>
              <button mat-menu-item>Last 12 months</button>
            </mat-menu>
          </mat-card-header>
          <mat-card-content>
            <div class="chart-placeholder">
              [Time to Hire Chart Placeholder]
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="chart-card">
          <mat-card-header>
            <mat-card-title>Source Quality</mat-card-title>
            <mat-card-subtitle>Conversion rate by source</mat-card-subtitle>
            <button
              mat-icon-button
              [matMenuTriggerFor]="sourceMenu"
              class="more-button"
            >
              <mat-icon>more_vert</mat-icon>
            </button>
            <mat-menu #sourceMenu="matMenu">
              <button mat-menu-item>All Sources</button>
              <button mat-menu-item>Job Boards</button>
              <button mat-menu-item>Referrals</button>
            </mat-menu>
          </mat-card-header>
          <mat-card-content>
            <div class="chart-placeholder">
              [Source Quality Chart Placeholder]
            </div>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [
    `
      .analytics-container {
        padding: 20px;
      }

      .metrics-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
        gap: 20px;
        margin-bottom: 24px;
      }

      .metric-card {
        padding: 20px;
        display: flex;
        align-items: flex-start;
        gap: 16px;
      }

      .metric-icon {
        background-color: #e3f2fd;
        border-radius: 8px;
        padding: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .metric-icon mat-icon {
        font-size: 24px;
        width: 24px;
        height: 24px;
        color: #1976d2;
      }

      .metric-content {
        flex: 1;
      }

      .metric-title {
        color: rgba(0, 0, 0, 0.6);
        font-size: 14px;
        margin-bottom: 4px;
      }

      .metric-value {
        font-size: 24px;
        font-weight: 500;
        color: rgba(0, 0, 0, 0.87);
        margin-bottom: 4px;
      }

      .metric-change {
        display: flex;
        align-items: center;
        gap: 4px;
        font-size: 14px;
      }

      .metric-change mat-icon {
        font-size: 16px;
        width: 16px;
        height: 16px;
      }

      .positive {
        color: #4caf50;
      }

      .negative {
        color: #f44336;
      }

      .charts-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
        gap: 20px;
      }

      .chart-card {
        position: relative;
      }

      .more-button {
        position: absolute;
        top: 8px;
        right: 8px;
      }

      .funnel-table {
        width: 100%;
      }

      .department {
        font-size: 12px;
        color: rgba(0, 0, 0, 0.6);
        margin-top: 4px;
      }

      .chart-placeholder {
        height: 300px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #f5f5f5;
        border-radius: 4px;
        color: rgba(0, 0, 0, 0.6);
        font-style: italic;
      }

      @media (max-width: 768px) {
        .metrics-grid {
          grid-template-columns: repeat(2, 1fr);
        }

        .charts-grid {
          grid-template-columns: 1fr;
        }
      }

      @media (max-width: 480px) {
        .metrics-grid {
          grid-template-columns: 1fr;
        }
      }
    `,
  ],
})
export class HiringAnalyticsComponent implements OnInit {
  metrics: MetricCard[] = [
    {
      title: 'Total Applications',
      value: '1,284',
      change: 12.5,
      icon: 'people',
    },
    {
      title: 'Interviews Scheduled',
      value: '156',
      change: 8.3,
      icon: 'event',
    },
    {
      title: 'Offers Extended',
      value: '32',
      change: -5.2,
      icon: 'description',
    },
    {
      title: 'Time to Hire',
      value: '28 days',
      change: -15.4,
      icon: 'schedule',
    },
  ];

  displayedColumns: string[] = [
    'position',
    'applicants',
    'interviews',
    'offers',
    'hires',
    'timeToHire',
  ];

  jobMetrics: JobMetrics[] = [
    {
      position: 'Software Engineer',
      department: 'Engineering',
      applicants: 245,
      interviews: 45,
      offers: 8,
      hires: 6,
      timeToHire: 32,
    },
    {
      position: 'Product Manager',
      department: 'Product',
      applicants: 180,
      interviews: 28,
      offers: 5,
      hires: 4,
      timeToHire: 28,
    },
    {
      position: 'UX Designer',
      department: 'Design',
      applicants: 156,
      interviews: 22,
      offers: 4,
      hires: 3,
      timeToHire: 25,
    },
    {
      position: 'Sales Representative',
      department: 'Sales',
      applicants: 198,
      interviews: 35,
      offers: 7,
      hires: 5,
      timeToHire: 21,
    },
  ];

  ngOnInit(): void {}
}
