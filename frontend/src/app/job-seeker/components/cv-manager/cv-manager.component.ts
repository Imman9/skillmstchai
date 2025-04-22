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

interface CV {
  id: string;
  name: string;
  email: string;
  phone: string;
  summary: string;
  skills: string[];
  link?: string;
}

@Component({
  selector: 'app-cv-manager',
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
    <div class="cv-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>CV Manager</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <form [formGroup]="cvForm" (ngSubmit)="addCV()" class="cv-form">
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Full Name</mat-label>
              <input matInput formControlName="name" required />
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Email</mat-label>
              <input matInput formControlName="email" type="email" required />
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Phone Number</mat-label>
              <input matInput formControlName="phone" type="tel" required />
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Professional Summary</mat-label>
              <textarea
                matInput
                formControlName="summary"
                rows="4"
                required
              ></textarea>
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Skills</mat-label>
              <mat-chip-grid #chipGrid>
                <mat-chip-row
                  *ngFor="let skill of skills"
                  (removed)="removeSkill(skill)"
                >
                  {{ skill }}
                  <button matChipRemove>
                    <mat-icon>cancel</mat-icon>
                  </button>
                </mat-chip-row>
              </mat-chip-grid>
              <input
                placeholder="New skill..."
                [matChipInputFor]="chipGrid"
                (matChipInputTokenEnd)="addSkill($event)"
              />
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>CV Link</mat-label>
              <input matInput formControlName="link" type="url" />
            </mat-form-field>

            <button
              mat-raised-button
              color="primary"
              type="submit"
              [disabled]="!cvForm.valid"
            >
              Add CV
            </button>
          </form>

          <mat-accordion class="cv-list">
            <mat-expansion-panel *ngFor="let cv of cvs">
              <mat-expansion-panel-header>
                <mat-panel-title>{{ cv.name }}</mat-panel-title>
                <mat-panel-description>
                  {{ cv.email }} | {{ cv.skills.join(', ') }}
                </mat-panel-description>
              </mat-expansion-panel-header>

              <p>{{ cv.summary }}</p>
              <div class="cv-details">
                <span>Phone: {{ cv.phone }}</span>
                <a
                  *ngIf="cv.link"
                  [href]="cv.link"
                  target="_blank"
                  mat-button
                  color="primary"
                >
                  View CV
                </a>
              </div>

              <mat-action-row>
                <button mat-button color="warn" (click)="deleteCV(cv)">
                  <mat-icon>delete</mat-icon>
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
      .cv-container {
        padding: 20px;
      }
      .cv-form {
        margin-bottom: 20px;
      }
      .full-width {
        width: 100%;
        margin-bottom: 16px;
      }
      .cv-list {
        margin-top: 20px;
      }
      .cv-details {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 16px;
      }
    `,
  ],
})
export class CvManagerComponent implements OnInit {
  cvForm: FormGroup;
  skills: string[] = [];
  cvs: CV[] = [];

  constructor(private fb: FormBuilder) {
    this.cvForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      summary: ['', Validators.required],
      link: [''],
    });
  }

  ngOnInit(): void {}

  addCV(): void {
    if (this.cvForm.valid) {
      const newCV: CV = {
        id: Date.now().toString(),
        ...this.cvForm.value,
        skills: [...this.skills],
      };
      this.cvs.push(newCV);
      this.cvForm.reset();
      this.skills = [];
    }
  }

  deleteCV(cv: CV): void {
    const index = this.cvs.findIndex((c) => c.id === cv.id);
    if (index !== -1) {
      this.cvs.splice(index, 1);
    }
  }

  addSkill(event: any): void {
    const value = (event.value || '').trim();
    if (value) {
      this.skills.push(value);
      event.chipInput!.clear();
    }
  }

  removeSkill(skill: string): void {
    const index = this.skills.indexOf(skill);
    if (index >= 0) {
      this.skills.splice(index, 1);
    }
  }
}
