import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips';

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  startDate: Date;
  endDate?: Date;
  link?: string;
}

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
    MatChipsModule,
  ],
  template: `
    <div class="portfolio-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Your Portfolio</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <form
            [formGroup]="projectForm"
            (ngSubmit)="addProject()"
            class="project-form"
          >
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Project Title</mat-label>
              <input matInput formControlName="title" required />
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Description</mat-label>
              <textarea
                matInput
                formControlName="description"
                rows="4"
                required
              ></textarea>
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Technologies</mat-label>
              <mat-chip-grid #chipGrid>
                <mat-chip-row
                  *ngFor="let tech of technologies"
                  (removed)="removeTechnology(tech)"
                >
                  {{ tech }}
                  <button matChipRemove>
                    <mat-icon>cancel</mat-icon>
                  </button>
                </mat-chip-row>
              </mat-chip-grid>
              <input
                placeholder="New technology..."
                [matChipInputFor]="chipGrid"
                (matChipInputTokenEnd)="addTechnology($event)"
              />
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Project Link</mat-label>
              <input matInput formControlName="link" type="url" />
            </mat-form-field>

            <button
              mat-raised-button
              color="primary"
              type="submit"
              [disabled]="!projectForm.valid"
            >
              Add Project
            </button>
          </form>

          <mat-accordion class="projects-list">
            <mat-expansion-panel *ngFor="let project of projects">
              <mat-expansion-panel-header>
                <mat-panel-title>{{ project.title }}</mat-panel-title>
                <mat-panel-description>
                  {{ project.technologies.join(', ') }}
                </mat-panel-description>
              </mat-expansion-panel-header>

              <p>{{ project.description }}</p>
              <div class="project-details">
                <span
                  >Duration: {{ project.startDate | date }} -
                  {{
                    project.endDate ? (project.endDate | date) : 'Present'
                  }}</span
                >
                <a
                  *ngIf="project.link"
                  [href]="project.link"
                  target="_blank"
                  mat-button
                  color="primary"
                >
                  View Project
                </a>
              </div>

              <mat-action-row>
                <button
                  mat-button
                  color="warn"
                  (click)="deleteProject(project)"
                >
                  Delete
                </button>
              </mat-action-row>
            </mat-expansion-panel>
          </mat-accordion>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [
    `
      .portfolio-container {
        padding: 20px;
      }
      .project-form {
        margin-bottom: 20px;
      }
      .full-width {
        width: 100%;
        margin-bottom: 16px;
      }
      .projects-list {
        margin-top: 20px;
      }
      .project-details {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 16px;
      }
    `,
  ],
})
export class PortfolioComponent implements OnInit {
  projectForm: FormGroup;
  technologies: string[] = [];
  projects: Project[] = [
    {
      id: '1',
      title: 'E-commerce Platform',
      description:
        'A full-featured e-commerce platform built with Angular and Node.js',
      technologies: ['Angular', 'Node.js', 'MongoDB', 'Express'],
      startDate: new Date('2023-01-01'),
      link: 'https://github.com/example/ecommerce',
    },
    {
      id: '2',
      title: 'Task Management App',
      description:
        'A collaborative task management application with real-time updates',
      technologies: ['React', 'Firebase', 'Redux'],
      startDate: new Date('2023-06-01'),
      endDate: new Date('2023-12-31'),
    },
  ];

  constructor(private fb: FormBuilder) {
    this.projectForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      link: [''],
    });
  }

  ngOnInit(): void {
    // Load projects from backend
  }

  addProject(): void {
    if (this.projectForm.valid) {
      const newProject: Project = {
        id: Date.now().toString(),
        ...this.projectForm.value,
        technologies: [...this.technologies],
        startDate: new Date(),
      };
      this.projects.push(newProject);
      this.projectForm.reset();
      this.technologies = [];
    }
  }

  deleteProject(project: Project): void {
    const index = this.projects.findIndex((p) => p.id === project.id);
    if (index !== -1) {
      this.projects.splice(index, 1);
    }
  }

  addTechnology(event: any): void {
    const value = (event.value || '').trim();
    if (value) {
      this.technologies.push(value);
      event.chipInput!.clear();
    }
  }

  removeTechnology(tech: string): void {
    const index = this.technologies.indexOf(tech);
    if (index >= 0) {
      this.technologies.splice(index, 1);
    }
  }
}
