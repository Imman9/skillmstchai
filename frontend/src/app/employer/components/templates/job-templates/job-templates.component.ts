import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';

interface JobTemplate {
  id: number;
  title: string;
  department: string;
  type: string;
  description: string;
  skills: string[];
  lastUsed: string;
}

@Component({
  selector: 'app-job-templates',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatGridListModule,
    MatMenuModule,
  ],
  template: `
    <div class="templates-container">
      <mat-card class="header-card">
        <mat-card-header>
          <mat-card-title>Job Templates</mat-card-title>
          <mat-card-subtitle
            >Create and manage reusable job templates</mat-card-subtitle
          >
        </mat-card-header>
        <mat-card-actions align="end">
          <button mat-raised-button color="primary">New Template</button>
        </mat-card-actions>
      </mat-card>

      <mat-grid-list cols="2" rowHeight="400px" gutterSize="20px">
        <mat-grid-tile *ngFor="let template of jobTemplates">
          <mat-card class="template-card">
            <mat-card-header>
              <mat-card-title>{{ template.title }}</mat-card-title>
              <mat-card-subtitle>{{ template.department }}</mat-card-subtitle>
              <button
                mat-icon-button
                [matMenuTriggerFor]="menu"
                class="more-button"
              >
                <i class="fas fa-ellipsis-v"></i>
              </button>
              <mat-menu #menu="matMenu">
                <button mat-menu-item>
                  <span>Edit</span>
                </button>
                <button mat-menu-item>
                  <span>Duplicate</span>
                </button>
                <button mat-menu-item color="warn">
                  <span>Delete</span>
                </button>
              </mat-menu>
            </mat-card-header>

            <mat-card-content>
              <mat-chip-set>
                <mat-chip>{{ template.type }}</mat-chip>
              </mat-chip-set>

              <p class="description">{{ template.description }}</p>

              <div class="skills-section">
                <h4>Required Skills</h4>
                <mat-chip-set>
                  <mat-chip
                    *ngFor="let skill of template.skills"
                    color="primary"
                    selected
                  >
                    {{ skill }}
                  </mat-chip>
                </mat-chip-set>
              </div>

              <p class="last-used">Last used: {{ template.lastUsed }}</p>
            </mat-card-content>

            <mat-card-actions>
              <button mat-button color="primary">Use Template</button>
            </mat-card-actions>
          </mat-card>
        </mat-grid-tile>
      </mat-grid-list>
    </div>
  `,
  styles: [
    `
      .templates-container {
        padding: 20px;
      }

      .header-card {
        margin-bottom: 20px;
      }

      .template-card {
        width: 100%;
        height: 100%;
        margin: 10px;
        position: relative;
      }

      .more-button {
        position: absolute;
        top: 8px;
        right: 8px;
      }

      .description {
        margin: 16px 0;
        color: rgba(0, 0, 0, 0.87);
        height: 80px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 4;
        -webkit-box-orient: vertical;
      }

      .skills-section {
        margin: 16px 0;
      }

      .skills-section h4 {
        margin-bottom: 8px;
        color: rgba(0, 0, 0, 0.6);
      }

      .last-used {
        margin-top: 16px;
        color: rgba(0, 0, 0, 0.6);
        font-size: 0.875rem;
      }

      mat-card-actions {
        padding: 16px;
      }

      .mat-chip-set {
        margin-top: 8px;
      }

      mat-chip {
        margin: 4px;
      }
    `,
  ],
})
export class JobTemplatesComponent {
  jobTemplates: JobTemplate[] = [
    {
      id: 1,
      title: 'Software Engineer',
      department: 'Engineering',
      type: 'Full-time',
      description:
        'We are looking for a software engineer with strong problem-solving skills and experience in modern web technologies.',
      skills: ['JavaScript', 'TypeScript', 'Angular', 'Node.js'],
      lastUsed: '2024-02-15',
    },
    {
      id: 2,
      title: 'Product Designer',
      department: 'Design',
      type: 'Full-time',
      description:
        'Seeking a product designer to create intuitive and beautiful user experiences for our products.',
      skills: ['UI/UX', 'Figma', 'User Research', 'Prototyping'],
      lastUsed: '2024-03-01',
    },
    {
      id: 3,
      title: 'Marketing Manager',
      department: 'Marketing',
      type: 'Full-time',
      description:
        'Looking for an experienced marketing manager to lead our digital marketing initiatives.',
      skills: ['Digital Marketing', 'SEO', 'Content Strategy', 'Analytics'],
      lastUsed: '2024-03-10',
    },
    {
      id: 4,
      title: 'Sales Representative',
      department: 'Sales',
      type: 'Full-time',
      description:
        'Join our sales team to help drive business growth and build strong client relationships.',
      skills: ['B2B Sales', 'Negotiation', 'CRM', 'Lead Generation'],
      lastUsed: '2024-02-28',
    },
  ];
}
