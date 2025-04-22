import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../../core/services/auth.service';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-employer-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatButtonModule,
    MatMenuModule,
    MatBadgeModule,
    MatDividerModule,
    MatIconModule,
  ],
  template: `
    <div class="dashboard-container">
      <mat-toolbar class="toolbar" color="primary">
        <div class="toolbar-left">
          <button mat-icon-button (click)="drawer.toggle()" class="menu-button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 0 24 24"
              width="24"
              fill="currentColor"
              style="display: block;"
            >
              <path
                d="M4 6h16M4 12h16M4 18h16"
                stroke="currentColor"
                stroke-width="2"
                fill="none"
              />
            </svg>
          </button>
          <span class="app-title">SkillMatch AI</span>
        </div>
        <div class="toolbar-right">
          <button
            mat-button
            [matMenuTriggerFor]="userMenu"
            class="profile-button"
          >
            <span>Company Profile</span>
          </button>
          <mat-menu #userMenu="matMenu">
            <button mat-menu-item routerLink="/company/profile">
              <span>Company Profile</span>
            </button>
            <button mat-menu-item routerLink="/company/settings">
              <span>Settings</span>
            </button>
            <mat-divider></mat-divider>
            <button mat-menu-item (click)="logout()">
              <span>Logout</span>
            </button>
          </mat-menu>
        </div>
      </mat-toolbar>

      <div class="main-content-container">
        <mat-sidenav-container class="sidenav-container">
          <mat-sidenav
            #drawer
            class="sidenav"
            fixedInViewport
            [attr.role]="(isHandset$ | async) ? 'dialog' : 'navigation'"
            [mode]="(isHandset$ | async) ? 'over' : 'side'"
            [opened]="(isHandset$ | async) === false"
          >
            <mat-nav-list>
              <div class="nav-section">
                <h3 class="nav-section-header">JOB MANAGEMENT</h3>
                <a
                  mat-list-item
                  routerLink="listings"
                  routerLinkActive="active"
                >
                  <span class="nav-label">Active Listings</span>
                </a>
                <a
                  mat-list-item
                  routerLink="post-job"
                  routerLinkActive="active"
                >
                  <span class="nav-label">Posted Jobs</span>
                </a>
                <a
                  mat-list-item
                  routerLink="templates"
                  routerLinkActive="active"
                >
                  <span class="nav-label">Job Templates</span>
                </a>
              </div>

              <mat-divider class="nav-divider"></mat-divider>

              <div class="nav-section">
                <h3 class="nav-section-header">TALENT ACQUISITION</h3>
                <a
                  mat-list-item
                  routerLink="candidates"
                  routerLinkActive="active"
                >
                  <span class="nav-label">Candidate Pool</span>
                </a>
                <a mat-list-item routerLink="search" routerLinkActive="active">
                  <span class="nav-label">AI Search</span>
                </a>
                <a
                  mat-list-item
                  routerLink="interviews"
                  routerLinkActive="active"
                >
                  <span class="nav-label">Interview Schedule</span>
                </a>
              </div>

              <mat-divider class="nav-divider"></mat-divider>

              <div class="nav-section">
                <h3 class="nav-section-header">INSIGHTS</h3>
                <a
                  mat-list-item
                  routerLink="analytics"
                  routerLinkActive="active"
                >
                  <span class="nav-label">Hiring Analytics</span>
                </a>
              </div>
            </mat-nav-list>
          </mat-sidenav>

          <mat-sidenav-content class="content-wrapper">
            <div class="content">
              <router-outlet></router-outlet>
            </div>
          </mat-sidenav-content>
        </mat-sidenav-container>
      </div>
    </div>
  `,
  styles: [
    `
      .dashboard-container {
        display: flex;
        flex-direction: column;
        height: 100vh;
      }

      .toolbar {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 2;
        display: flex;
        justify-content: space-between;
        padding: 0 16px;
        background: linear-gradient(135deg, #1976d2 0%, #0d47a1 100%);
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      }

      .toolbar-left {
        display: flex;
        align-items: center;
        gap: 16px;
      }

      .toolbar-right {
        display: flex;
        align-items: center;
      }

      .app-title {
        font-size: 1.25rem;
        font-weight: 500;
        color: white;
      }

      .menu-button {
        color: white;
      }

      .profile-button {
        color: white;
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .profile-icon {
        margin-right: 8px;
      }

      .main-content-container {
        margin-top: 64px; /* Matches toolbar height */
        height: calc(100vh - 64px);
      }

      .sidenav-container {
        height: 100%;
      }

      .sidenav {
        width: 260px;
        background: white;
        border-right: 1px solid #e0e0e0;
        box-shadow: 2px 0 8px rgba(0, 0, 0, 0.05);
        top: 64px !important; /* Prevent overlap with toolbar */
        height: calc(100vh - 64px) !important;
      }

      .content-wrapper {
        background-color: #f5f7fa;
        min-height: calc(100vh - 64px);
      }

      .content {
        padding: 24px;
        max-width: 1200px;
        margin: 0 auto;
      }

      .nav-section {
        padding: 8px 0;
      }

      .nav-section-header {
        color: #757575;
        font-size: 0.75rem;
        font-weight: 500;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        padding: 16px 16px 8px;
        margin: 0;
      }

      .nav-divider {
        margin: 8px 16px;
      }

      mat-nav-list a {
        height: 48px;
        margin: 4px 8px;
        border-radius: 4px;
        color: #424242;
        font-weight: 400;
        transition: all 0.2s ease;
      }

      mat-nav-list a:hover {
        background-color: #f0f0f0;
      }

      mat-nav-list a.active {
        background-color: #e3f2fd;
        color: #1976d2;
        font-weight: 500;
      }

      .nav-icon {
        margin-right: 16px;
        color: #757575;
        font-size: 20px;
        width: 20px;
        height: 20px;
      }

      .nav-label {
        font-size: 0.9rem;
      }

      a.active .nav-icon {
        color: #1976d2;
      }

      @media (max-width: 768px) {
        .sidenav {
          width: 240px;
          top: 56px !important; /* Adjusted for mobile toolbar height */
          height: calc(100vh - 56px) !important;
        }

        .main-content-container {
          margin-top: 56px;
          height: calc(100vh - 56px);
        }

        .content {
          padding: 16px;
        }
      }
    `,
  ],
})
export class EmployerDashboardComponent {
  isHandset$: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private breakpointObserver: BreakpointObserver
  ) {
    this.isHandset$ = this.breakpointObserver
      .observe('(max-width: 768px)')
      .pipe(map((result: BreakpointState) => result.matches));
  }

  logout(): void {
    this.authService.logout();
  }
}
