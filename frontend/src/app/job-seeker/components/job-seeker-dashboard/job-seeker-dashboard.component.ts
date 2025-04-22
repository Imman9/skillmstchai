import { Component, ViewChild, ChangeDetectorRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatSidenavModule, MatSidenav } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDividerModule } from '@angular/material/divider';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-job-seeker-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatBadgeModule,
    MatDividerModule,
  ],
  template: `
    <div class="dashboard-container">
      <mat-toolbar class="toolbar" color="primary">
        <div class="toolbar-left">
          <button mat-icon-button (click)="toggleSidenav()" class="menu-button">
            <i class="fas fa-bars"></i>
          </button>
          <span class="app-title">SkillMatch AI</span>
        </div>
        <div class="toolbar-right">
          <button
            mat-icon-button
            [matBadge]="3"
            matBadgeColor="warn"
            class="notification-button"
          >
            <i class="fas fa-bell"></i>
          </button>
          <button mat-icon-button [matMenuTriggerFor]="userMenu">
            <i class="fas fa-user-circle"></i>
          </button>
          <mat-menu #userMenu="matMenu">
            <button mat-menu-item routerLink="profile">
              <i class="fas fa-user me-2"></i>
              <span>My Profile</span>
            </button>
            <button mat-menu-item routerLink="settings">
              <i class="fas fa-cog me-2"></i>
              <span>Settings</span>
            </button>
            <mat-divider></mat-divider>
            <button mat-menu-item (click)="logout()">
              <i class="fas fa-sign-out-alt me-2"></i>
              <span>Logout</span>
            </button>
          </mat-menu>
        </div>
      </mat-toolbar>

      <mat-sidenav-container class="sidenav-container">
        <mat-sidenav
          #sidenav
          [mode]="sidenavMode"
          [opened]="sidenavOpened"
          class="sidenav"
          [fixedInViewport]="mobileView"
        >
          <mat-nav-list>
            <div class="nav-section">
              <h3 matSubheader>Profile & Portfolio</h3>
              <a
                mat-list-item
                routerLink="profile"
                routerLinkActive="active"
                (click)="onNavItemClick()"
              >
                <span>Profile Overview</span>
              </a>
              <a
                mat-list-item
                routerLink="skills"
                routerLinkActive="active"
                (click)="onNavItemClick()"
              >
                <span>Skill Management</span>
              </a>
              <a
                mat-list-item
                routerLink="portfolio"
                routerLinkActive="active"
                (click)="onNavItemClick()"
              >
                <span>Portfolio</span>
              </a>
              <a
                mat-list-item
                routerLink="cv"
                routerLinkActive="active"
                (click)="onNavItemClick()"
              >
                <span>CV Manager</span>
              </a>
            </div>

            <mat-divider></mat-divider>

            <div class="nav-section">
              <h3 matSubheader>Job Search</h3>
              <a
                mat-list-item
                routerLink="matches"
                routerLinkActive="active"
                (click)="onNavItemClick()"
              >
                <span>Job Matches</span>
              </a>
              <a
                mat-list-item
                routerLink="applications"
                routerLinkActive="active"
                (click)="onNavItemClick()"
              >
                <span>Applications</span>
              </a>
              <a
                mat-list-item
                routerLink="interviews"
                routerLinkActive="active"
                (click)="onNavItemClick()"
              >
                <span>Interviews</span>
              </a>
            </div>

            <mat-divider></mat-divider>

            <div class="nav-section">
              <h3 matSubheader>Career Development</h3>
              <a
                mat-list-item
                routerLink="career-paths"
                routerLinkActive="active"
                (click)="onNavItemClick()"
              >
                <span>Career Paths</span>
              </a>
            </div>

            <mat-divider></mat-divider>

            <div class="nav-section">
              <h3 matSubheader>Additional</h3>
              <a
                mat-list-item
                routerLink="chatbot"
                routerLinkActive="active"
                (click)="onNavItemClick()"
              >
                <span>Query Assistant</span>
              </a>
            </div>
          </mat-nav-list>
        </mat-sidenav>

        <mat-sidenav-content class="content">
          <div class="content-wrapper">
            <router-outlet></router-outlet>
          </div>
        </mat-sidenav-content>
      </mat-sidenav-container>
    </div>
  `,
  styles: [
    `
      .dashboard-container {
        height: 100vh;
        display: flex;
        flex-direction: column;
      }

      .toolbar {
        display: flex;
        justify-content: space-between;
        padding: 0 16px;
        background: linear-gradient(135deg, #1976d2 0%, #2196f3 100%);
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 1000;
      }

      .toolbar-left {
        display: flex;
        align-items: center;
        gap: 16px;
      }

      .toolbar-right {
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .app-title {
        font-size: 1.25rem;
        font-weight: 600;
        letter-spacing: 0.5px;
      }

      .sidenav-container {
        flex: 1;
        background-color: #f8fafc;
        margin-top: 64px; /* Height of toolbar */
      }

      .sidenav {
        width: 250px;
        background-color: white;
        border-right: 1px solid #e2e8f0;
      }

      .content {
        background-color: #f8fafc;
      }

      .content-wrapper {
        padding: 24px;
        max-width: 1200px;
        margin: 0 auto;
      }

      mat-nav-list {
        padding-top: 16px;
      }

      mat-nav-list a {
        height: 48px;
        margin: 8px 12px;
        border-radius: 8px;
        color: #4a5568;
        font-weight: 500;
        display: flex;
        align-items: center;
        gap: 12px;
      }

      mat-nav-list a.active {
        background-color: #e3f2fd;
        color: #1976d2;
      }

      mat-nav-list a:hover {
        background-color: #f8fafc;
      }

      mat-nav-list a mat-icon {
        margin-right: 12px;
        color: inherit;
      }

      .nav-section {
        padding: 8px 0;
      }

      h3[matSubheader] {
        color: #64748b;
        font-size: 0.75rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        padding: 16px 24px 8px;
        margin: 0;
      }

      mat-divider {
        margin: 8px 0;
      }

      .mat-badge-content {
        font-family: 'Inter', sans-serif;
        font-weight: 500;
      }
      .menu-button svg {
        width: 24px;
        height: 24px;
      }

      /* Mobile Styles */
      @media (max-width: 768px) {
        .toolbar {
          padding: 0 8px;
        }

        .app-title {
          font-size: 1.1rem;
        }

        .sidenav {
          width: 85%;
          max-width: 300px;
        }

        .content-wrapper {
          padding: 16px;
        }

        .sidenav-container {
          margin-top: 56px; /* Smaller toolbar height on mobile */
        }

        mat-nav-list a {
          margin: 4px 8px;
          height: 44px;
        }

        h3[matSubheader] {
          padding: 12px 16px 6px;
        }
      }

      /* Tablet Styles */
      @media (min-width: 769px) and (max-width: 1024px) {
        .sidenav {
          width: 220px;
        }

        .content-wrapper {
          padding: 20px;
        }
      }

      /* Animation for sidenav */
      .sidenav {
        transition: width 0.3s ease-in-out;
      }

      /* Hide menu button on larger screens */
      @media (min-width: 1025px) {
        .menu-button {
          display: none;
        }
      }

      /* Notification badge styles */
      .notification-button {
        margin-right: 8px;
      }

      /* Active route indicator */
      .active mat-icon {
        color: #1976d2;
      }
    `,
  ],
})
export class JobSeekerDashboardComponent implements OnInit {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  mobileView = false;
  sidenavMode: 'side' | 'over' = 'side';
  sidenavOpened = true;

  constructor(
    private authService: AuthService,
    private breakpointObserver: BreakpointObserver,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.breakpointObserver
      .observe([Breakpoints.XSmall, Breakpoints.Small])
      .subscribe((result) => {
        this.mobileView = result.matches;
        this.sidenavMode = result.matches ? 'over' : 'side';
        this.sidenavOpened = !result.matches;
        this.cdr.detectChanges();
      });
  }

  toggleSidenav() {
    this.sidenav.toggle();
  }

  onNavItemClick() {
    if (this.mobileView) {
      this.sidenav.close();
    }
  }

  logout() {
    this.authService.logout();
  }
}
