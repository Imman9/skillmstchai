import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { RoleGuard } from './core/guards/role.guard';
import { UserRole } from './core/models/user-role.enum';
import { LoginComponent } from './auth/components/login/login.component';
import { SignupComponent } from './auth/components/signup/signup.component';
import { JobSeekerDashboardComponent } from './job-seeker/components/job-seeker-dashboard/job-seeker-dashboard.component';
import { EmployerDashboardComponent } from './employer/components/employer-dashboard/employer-dashboard.component';
import { AdminDashboardComponent } from './admin/components/admin-dashboard/admin-dashboard.component';
import { LandingPageComponent } from './landing-page/landing-page.components';

export const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
  },
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'signup',
        component: SignupComponent,
      },
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'job-seeker',
    component: JobSeekerDashboardComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: UserRole.JOB_SEEKER },
    children: [
      {
        path: '',
        redirectTo: 'profile',
        pathMatch: 'full',
      },
      {
        path: 'skills',
        loadComponent: () =>
          import(
            './job-seeker/components/skill-management/skill-management.component'
          ).then((m) => m.SkillManagementComponent),
      },
      {
        path: 'interviews',
        loadComponent: () =>
          import(
            './job-seeker/components/interviews/interviews.component'
          ).then((m) => m.InterviewsComponent),
      },
      {
        path: 'career-paths',
        loadComponent: () =>
          import(
            './job-seeker/components/career-paths/career-paths.component'
          ).then((m) => m.CareerPathsComponent),
      },

      {
        path: 'profile',
        loadComponent: () =>
          import('./job-seeker/components/profile/profile.component').then(
            (m) => m.ProfileComponent
          ),
      },
      {
        path: 'matches',
        loadComponent: () =>
          import(
            './job-seeker/components/job-matches/job-matches.component'
          ).then((m) => m.JobMatchesComponent),
      },
      {
        path: 'applications',
        loadComponent: () =>
          import(
            './job-seeker/components/applications/applications.component'
          ).then((m) => m.ApplicationsComponent),
      },
      {
        path: 'portfolio',
        loadComponent: () =>
          import('./job-seeker/components/portfolio/portfolio.component').then(
            (m) => m.PortfolioComponent
          ),
      },
      {
        path: 'cv',
        loadComponent: () =>
          import(
            './job-seeker/components/cv-manager/cv-manager.component'
          ).then((m) => m.CvManagerComponent),
      },
      {
        path: 'chatbot',
        loadComponent: () =>
          import('./job-seeker/components/chatbot/chatbot.component').then(
            (m) => m.ChatbotComponent
          ),
      },
    ],
  },
  {
    path: 'employer',
    component: EmployerDashboardComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: UserRole.EMPLOYER },
    children: [
      {
        path: '',
        redirectTo: 'listings',
        pathMatch: 'full',
      },
      {
        path: 'listings',
        loadComponent: () =>
          import(
            './employer/components/listings/active-listings/active-listings.component'
          ).then((m) => m.ActiveListingsComponent),
      },
      {
        path: 'post-job',
        loadComponent: () =>
          import('./employer/components/post-job/post-job.component').then(
            (m) => m.PostJobComponent
          ),
      },
      {
        path: 'templates',
        loadComponent: () =>
          import(
            './employer/components/templates/job-templates/job-templates.component'
          ).then((m) => m.JobTemplatesComponent),
      },
      {
        path: 'candidates',
        loadComponent: () =>
          import(
            './employer/components/view-candidates/view-candidates.component'
          ).then((m) => m.ViewCandidatesComponent),
      },
      {
        path: 'search',
        loadComponent: () =>
          import(
            './employer/components/search/ai-search/ai-search.component'
          ).then((m) => m.AiSearchComponent),
      },
      {
        path: 'interviews',
        loadComponent: () =>
          import(
            './employer/components/manage-interviews/manage-interviews.component'
          ).then((m) => m.ManageInterviewsComponent),
      },
      {
        path: 'analytics',
        loadComponent: () =>
          import(
            './employer/components/analytics/hiring-analytics/hiring-analytics.component'
          ).then((m) => m.HiringAnalyticsComponent),
      },
    ],
  },
  {
    path: 'admin',
    component: AdminDashboardComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: UserRole.ADMIN },
    children: [
      {
        path: '',
        redirectTo: 'users',
        pathMatch: 'full',
      },
      {
        path: 'users',
        loadComponent: () =>
          import(
            './admin/components/user-management/user-management.component'
          ).then((m) => m.UserManagementComponent),
      },
      {
        path: 'monitoring',
        loadComponent: () =>
          import(
            './admin/components/system-monitoring/system-monitoring.component'
          ).then((m) => m.SystemMonitoringComponent),
      },
      {
        path: 'ai-models',
        loadComponent: () =>
          import(
            './admin/components/ai-model-management/ai-model-management.component'
          ).then((m) => m.AIModelManagementComponent),
      },
      {
        path: 'analytics',
        loadComponent: () =>
          import(
            './admin/components/platform-analytics/platform-analytics.component'
          ).then((m) => m.PlatformAnalyticsComponent),
      },

      {
        path: 'accuracy-metrics',
        loadComponent: () =>
          import(
            './admin/components/accuracy-metrics/accuracy-metrics.component'
          ).then((m) => m.AccuracyMetricsComponent),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
