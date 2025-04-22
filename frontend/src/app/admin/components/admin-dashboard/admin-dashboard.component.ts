import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDividerModule } from '@angular/material/divider';
import { AuthService } from '../../../core/services/auth.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-admin-dashboard',
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
          <button mat-icon-button (click)="sidenav.toggle()">
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
          <button mat-icon-button [matBadge]="5" matBadgeColor="warn">
            <i class="fas fa-bell"></i>
          </button>
          <button mat-icon-button [matMenuTriggerFor]="userMenu">
            <i class="	fas fa-cog"></i>
          </button>
          <mat-menu #userMenu="matMenu">
            <button mat-menu-item routerLink="profile">
              <i class="	fas fa-user"></i>
              <span>Admin Profile</span>
            </button>
            <button mat-menu-item routerLink="settings">
              <i class="	fas fa-cog"></i>
              <span>Settings</span>
            </button>
            <mat-divider></mat-divider>
            <button mat-menu-item (click)="logout()">
              <i class="	fas fa-sign-out-alt"></i>
              <span>Logout</span>
            </button>
          </mat-menu>
        </div>
      </mat-toolbar>

      <div class="main-content-container">
        <mat-sidenav-container class="sidenav-container">
          <mat-sidenav
            #sidenav
            [mode]="(isHandset$ | async) ? 'over' : 'side'"
            [opened]="!(isHandset$ | async)"
            class="sidenav"
            fixedInViewport
            [fixedTopGap]="64"
          >
            <mat-nav-list>
              <div class="nav-section">
                <h3 class="nav-section-header">User Management</h3>
                <a
                  mat-list-item
                  routerLink="users"
                  routerLinkActive="active"
                  (click)="closeIfHandset()"
                >
                  <span class="nav-label">User Accounts</span>
                </a>
              </div>

              <mat-divider class="nav-divider"></mat-divider>

              <div class="nav-section">
                <h3 class="nav-section-header">AI Management</h3>
                <a
                  mat-list-item
                  routerLink="ai-models"
                  routerLinkActive="active"
                  (click)="closeIfHandset()"
                >
                  <span class="nav-label">AI Models</span>
                </a>
                <a
                  mat-list-item
                  routerLink="accuracy-metrics"
                  routerLinkActive="active"
                  (click)="closeIfHandset()"
                >
                  <span class="nav-label">Accuracy Metrics</span>
                </a>
              </div>

              <mat-divider class="nav-divider"></mat-divider>

              <div class="nav-section">
                <h3 class="nav-section-header">System</h3>
                <a
                  mat-list-item
                  routerLink="monitoring"
                  routerLinkActive="active"
                  (click)="closeIfHandset()"
                >
                  <span class="nav-label">System Health</span>
                </a>
              </div>

              <mat-divider class="nav-divider"></mat-divider>

              <div class="nav-section">
                <h3 class="nav-section-header">Analytics</h3>
                <a
                  mat-list-item
                  routerLink="analytics"
                  routerLinkActive="active"
                  (click)="closeIfHandset()"
                >
                  <span class="nav-label">Platform Analytics</span>
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
        height: 64px;
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
        font-weight: 500;
        color: white;
      }

      .main-content-container {
        margin-top: 64px;
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
        transition: transform 0.3s ease;
      }

      .content-wrapper {
        background-color: #f5f7fa;
        min-height: 100%;
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
        }

        .content {
          padding: 16px;
        }
      }
    `,
  ],
})
export class AdminDashboardComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  isHandset$: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private breakpointObserver: BreakpointObserver
  ) {
    this.isHandset$ = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
      map((result) => result.matches),
      shareReplay()
    );
  }

  closeIfHandset() {
    if (this.isHandset$) {
      this.sidenav.close();
    }
  }

  logout(): void {
    this.authService.logout();
  }
}
