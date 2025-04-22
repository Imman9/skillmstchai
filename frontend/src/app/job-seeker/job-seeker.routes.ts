import { Routes } from '@angular/router';
import { JobSeekerDashboardComponent } from './components/job-seeker-dashboard/job-seeker-dashboard.component';
import { SkillManagementComponent } from './components/skill-management/skill-management.component';
import { InterviewsComponent } from './components/interviews/interviews.component';
import { CareerPathsComponent } from './components/career-paths/career-paths.component';

import { ProfileComponent } from './components/profile/profile.component';
import { JobMatchesComponent } from './components/job-matches/job-matches.component';
import { ApplicationsComponent } from './components/applications/applications.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { CvManagerComponent } from './components/cv-manager/cv-manager.component';

export const JOB_SEEKER_ROUTES: Routes = [
  {
    path: '',
    component: JobSeekerDashboardComponent,
    children: [
      {
        path: 'skills',
        component: SkillManagementComponent,
      },
      {
        path: 'interviews',
        component: InterviewsComponent,
      },
      {
        path: 'career-paths',
        component: CareerPathsComponent,
      },
      
      {
        path: '',
        redirectTo: 'profile',
        pathMatch: 'full',
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'matches',
        component: JobMatchesComponent,
      },
      {
        path: 'applications',
        component: ApplicationsComponent,
      },
      {
        path: 'portfolio',
        component: PortfolioComponent,
      },
      {
        path: 'cv',
        component: CvManagerComponent,
      },
    ],
  },
];
