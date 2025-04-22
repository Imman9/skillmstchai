import { Routes } from '@angular/router';
import { EmployerDashboardComponent } from './components/employer-dashboard/employer-dashboard.component';
import { ActiveListingsComponent } from './components/listings/active-listings/active-listings.component';
import { PostJobComponent } from './components/post-job/post-job.component';
import { JobTemplatesComponent } from './components/templates/job-templates/job-templates.component';
import { ViewCandidatesComponent } from './components/view-candidates/view-candidates.component';
import { AiSearchComponent } from './components/search/ai-search/ai-search.component';
import { ManageInterviewsComponent } from './components/manage-interviews/manage-interviews.component';
import { HiringAnalyticsComponent } from './components/analytics/hiring-analytics/hiring-analytics.component';
import { ReportsComponent } from './components/reports/reports/reports.component';

export const EMPLOYER_ROUTES: Routes = [
  {
    path: '',
    component: EmployerDashboardComponent,
    children: [
      {
        path: '',
        redirectTo: 'listings',
        pathMatch: 'full',
      },
      {
        path: 'listings',
        component: ActiveListingsComponent,
      },
      {
        path: 'post-job',
        component: PostJobComponent,
      },
      {
        path: 'templates',
        component: JobTemplatesComponent,
      },
      {
        path: 'candidates',
        component: ViewCandidatesComponent,
      },
      {
        path: 'search',
        component: AiSearchComponent,
      },
      {
        path: 'interviews',
        component: ManageInterviewsComponent,
      },
      {
        path: 'analytics',
        component: HiringAnalyticsComponent,
      },
      {
        path: 'reports',
        component: ReportsComponent,
      },
    ],
  },
];
