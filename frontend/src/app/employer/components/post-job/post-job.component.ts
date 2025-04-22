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
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';

interface Job {
  id: number;
  description: string;
  location: string;
  requiredSkills: string[];
  experienceLevel: string;
  salaryRange: string;
  postedDate: Date;
}

@Component({
  selector: 'app-post-job',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatChipsModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
  ],
  template: `
    <div class="post-job-container">
      <div class="header-section">
        <h2>Job Postings</h2>
        <button
          mat-raised-button
          color="primary"
          (click)="toggleFormVisibility()"
          class="toggle-button"
        >
          {{ showForm ? 'Hide Form' : 'Post New Job' }}
        </button>
      </div>

      <div *ngIf="showForm" class="form-section">
        <form [formGroup]="jobForm" (ngSubmit)="onSubmit()">
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Job Description</mat-label>
            <textarea
              matInput
              formControlName="description"
              rows="6"
              required
            ></textarea>
          </mat-form-field>

          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Location</mat-label>
            <input matInput formControlName="location" required />
          </mat-form-field>

          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Required Skills</mat-label>
            <mat-chip-grid #chipGrid>
              <mat-chip-row
                *ngFor="let skill of requiredSkills"
                (removed)="removeSkill(skill)"
              >
                {{ skill }}
                <button matChipRemove>×</button>
              </mat-chip-row>
            </mat-chip-grid>
            <input
              placeholder="New skill..."
              [matChipInputFor]="chipGrid"
              (matChipInputTokenEnd)="addSkill($event)"
            />
          </mat-form-field>

          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Experience Level</mat-label>
            <mat-select formControlName="experienceLevel" required>
              <mat-option value="entry">Entry Level</mat-option>
              <mat-option value="mid">Mid Level</mat-option>
              <mat-option value="senior">Senior Level</mat-option>
            </mat-select>
          </mat-form-field>

          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Salary Range</mat-label>
            <input matInput formControlName="salaryRange" required />
          </mat-form-field>

          <div class="button-container">
            <button
              mat-raised-button
              color="primary"
              type="submit"
              [disabled]="!jobForm.valid"
              class="post-button"
            >
              Post Job
            </button>
          </div>
        </form>
      </div>

      <div class="jobs-list">
        <mat-card *ngFor="let job of postedJobs" class="job-card">
          <mat-card-header>
            <mat-card-title>
              {{ job.description | slice : 0 : 50
              }}{{ job.description.length > 50 ? '...' : '' }}
            </mat-card-title>
            <mat-card-subtitle
              >{{ job.location }} •
              {{ job.postedDate | date }}</mat-card-subtitle
            >
          </mat-card-header>
          <mat-card-content>
            <div class="job-details">
              <div>
                <strong>Experience:</strong>
                {{ job.experienceLevel | titlecase }}
              </div>
              <div><strong>Salary:</strong> {{ job.salaryRange }}</div>
              <div class="skills-section">
                <strong>Skills:</strong>
                <mat-chip-listbox>
                  <mat-chip-option *ngFor="let skill of job.requiredSkills">
                    {{ skill }}
                  </mat-chip-option>
                </mat-chip-listbox>
              </div>
            </div>
          </mat-card-content>
        </mat-card>

        <div *ngIf="postedJobs.length === 0" class="no-jobs">
          <mat-icon>work_outline</mat-icon>
          <p>No jobs posted yet</p>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .post-job-container {
        max-width: 1000px;
        margin: 0 auto;
        padding: 20px;
      }

      .header-section {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
      }

      .toggle-button {
        min-width: 150px;
      }

      .form-section {
        background: white;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        margin-bottom: 30px;
      }

      .full-width {
        width: 100%;
        margin-bottom: 20px;
      }

      .button-container {
        display: flex;
        justify-content: flex-end;
        margin-top: 20px;
      }

      .post-button {
        min-width: 120px;
        height: 45px;
        font-size: 16px;
      }

      .jobs-list {
        display: grid;
        gap: 20px;
      }

      .job-card {
        transition: transform 0.2s;
      }

      .job-card:hover {
        transform: translateY(-2px);
      }

      .job-details {
        display: grid;
        gap: 10px;
        margin-top: 10px;
      }

      .skills-section {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 10px;
      }

      .no-jobs {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 40px;
        text-align: center;
        color: rgba(0, 0, 0, 0.54);
      }

      .no-jobs mat-icon {
        font-size: 60px;
        width: 60px;
        height: 60px;
        margin-bottom: 20px;
      }

      ::ng-deep .mat-mdc-form-field-subscript-wrapper {
        display: none;
      }
    `,
  ],
})
export class PostJobComponent implements OnInit {
  jobForm: FormGroup;
  requiredSkills: string[] = [];
  postedJobs: Job[] = [];
  showForm = false;

  constructor(private fb: FormBuilder) {
    this.jobForm = this.fb.group({
      description: ['', Validators.required],
      location: ['', Validators.required],
      experienceLevel: ['', Validators.required],
      salaryRange: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    // Load posted jobs from service/API
    this.loadPostedJobs();
  }

  toggleFormVisibility(): void {
    this.showForm = !this.showForm;
  }

  onSubmit(): void {
    if (this.jobForm.valid) {
      const newJob: Job = {
        id: Date.now(),
        ...this.jobForm.value,
        requiredSkills: [...this.requiredSkills],
        postedDate: new Date(),
      };

      this.postedJobs.unshift(newJob); // Add to beginning of array
      this.resetForm();
      this.showForm = false;

      // Here you would typically call a service to save to backend
      console.log('Job posted:', newJob);
    }
  }

  addSkill(event: any): void {
    const value = (event.value || '').trim();
    if (value) {
      this.requiredSkills.push(value);
      event.chipInput!.clear();
    }
  }

  removeSkill(skill: string): void {
    const index = this.requiredSkills.indexOf(skill);
    if (index >= 0) {
      this.requiredSkills.splice(index, 1);
    }
  }

  private resetForm(): void {
    this.jobForm.reset();
    this.requiredSkills = [];
  }

  private loadPostedJobs(): void {
    // Mock data - replace with actual API call
    this.postedJobs = [
      {
        id: 1,
        description: 'Frontend Developer with Angular experience',
        location: 'Remote',
        requiredSkills: ['Angular', 'TypeScript', 'HTML/CSS'],
        experienceLevel: 'mid',
        salaryRange: '$80,000 - $100,000',
        postedDate: new Date('2023-05-15'),
      },
      {
        id: 2,
        description: 'Backend Developer (Node.js)',
        location: 'New York, NY',
        requiredSkills: ['Node.js', 'Express', 'MongoDB'],
        experienceLevel: 'senior',
        salaryRange: '$110,000 - $140,000',
        postedDate: new Date('2023-05-10'),
      },
    ];
  }
}
