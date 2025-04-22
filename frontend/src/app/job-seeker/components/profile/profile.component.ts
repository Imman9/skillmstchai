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
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBar } from '@angular/material/snack-bar';
import { JobSeekerProfileService, JobSeekerProfile } from '../../../core/services/job-seeker-profile.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-profile',
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
    MatTooltipModule,
  ],
  template: `
    <div class="profile-container">
      <mat-card *ngIf="!isEditing">
        <mat-card-header>
          <mat-card-title>{{ currentProfile?.firstName }} {{ currentProfile?.lastName }}</mat-card-title>
          <mat-card-subtitle>{{ currentProfile?.headline }}</mat-card-subtitle>
        </mat-card-header>

        <mat-card-content>
          <p><strong>Email:</strong> {{ currentProfile?.email }}</p>
          <p><strong>Phone:</strong> {{ currentProfile?.phone }}</p>
          <p><strong>Location:</strong> {{ currentProfile?.location }}</p>
          <p><strong>Summary:</strong> {{ currentProfile?.summary }}</p>
          <p><strong>Experience:</strong> {{ currentProfile?.yearsOfExperience }} years</p>
          <p><strong>Preferred Job Type:</strong> {{ currentProfile?.preferredJobType }}</p>
          <p><strong>Preferred Location:</strong> {{ currentProfile?.preferredLocation }}</p>
          <p><strong>LinkedIn:</strong> <a [href]="currentProfile?.linkedinUrl" target="_blank">{{ currentProfile?.linkedinUrl }}</a></p>
          <p><strong>GitHub:</strong> <a [href]="currentProfile?.githubUrl" target="_blank">{{ currentProfile?.githubUrl }}</a></p>
          <p><strong>Portfolio:</strong> <a [href]="currentProfile?.portfolioUrl" target="_blank">{{ currentProfile?.portfolioUrl }}</a></p>
          <p><strong>Availability:</strong> {{ currentProfile?.availabilityStatus }}</p>
        </mat-card-content>

        <mat-card-actions>
          <button mat-raised-button color="primary" (click)="isEditing = true">Edit Profile</button>
        </mat-card-actions>
      </mat-card>

      <mat-card *ngIf="isEditing">
        <mat-card-header>
          <mat-card-title>Edit Profile</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <form [formGroup]="profileForm" (ngSubmit)="onSubmit()">
            <div class="form-row">
              <mat-form-field appearance="outline">
                <mat-label>First Name</mat-label>
                <input matInput formControlName="firstName" required />
              </mat-form-field>
              <mat-form-field appearance="outline">
                <mat-label>Last Name</mat-label>
                <input matInput formControlName="lastName" required />
              </mat-form-field>
            </div>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Headline</mat-label>
              <input matInput formControlName="headline" />
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Summary</mat-label>
              <textarea matInput rows="3" formControlName="summary"></textarea>
            </mat-form-field>

            <div class="form-row">
              <mat-form-field appearance="outline">
                <mat-label>Email</mat-label>
                <input matInput type="email" formControlName="email" />
              </mat-form-field>
              <mat-form-field appearance="outline">
                <mat-label>Phone</mat-label>
                <input matInput type="tel" formControlName="phone" />
              </mat-form-field>
            </div>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Location</mat-label>
              <input matInput formControlName="location" />
            </mat-form-field>

            <div class="form-row">
              <mat-form-field appearance="outline">
                <mat-label>Current Job Title</mat-label>
                <input matInput formControlName="currentJobTitle" />
              </mat-form-field>
              <mat-form-field appearance="outline">
                <mat-label>Years of Experience</mat-label>
                <input matInput type="number" formControlName="yearsOfExperience" />
              </mat-form-field>
            </div>

            <div class="form-row">
              <mat-form-field appearance="outline">
                <mat-label>Preferred Job Type</mat-label>
                <mat-select formControlName="preferredJobType">
                  <mat-option value="full-time">Full-time</mat-option>
                  <mat-option value="part-time">Part-time</mat-option>
                  <mat-option value="contract">Contract</mat-option>
                  <mat-option value="freelance">Freelance</mat-option>
                  <mat-option value="internship">Internship</mat-option>
                </mat-select>
              </mat-form-field>
              <mat-form-field appearance="outline">
                <mat-label>Preferred Location</mat-label>
                <input matInput formControlName="preferredLocation" />
              </mat-form-field>
            </div>

            <div class="form-row">
              <mat-form-field appearance="outline">
                <mat-label>LinkedIn</mat-label>
                <input matInput formControlName="linkedinUrl" />
              </mat-form-field>
              <mat-form-field appearance="outline">
                <mat-label>GitHub</mat-label>
                <input matInput formControlName="githubUrl" />
              </mat-form-field>
            </div>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Portfolio</mat-label>
              <input matInput formControlName="portfolioUrl" />
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Availability</mat-label>
              <mat-select formControlName="availabilityStatus">
                <mat-option value="actively_looking">Actively Looking</mat-option>
                <mat-option value="open_to_opportunities">Open to Opportunities</mat-option>
                <mat-option value="not_available">Not Available</mat-option>
              </mat-select>
            </mat-form-field>

            <div class="form-actions">
              <button mat-stroked-button type="button" (click)="isEditing = false">Cancel</button>
              <button mat-raised-button color="primary" type="submit" [disabled]="!profileForm.valid || isLoading">
                {{ isLoading ? 'Saving...' : 'Save' }}
              </button>
            </div>
          </form>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [
    `
      .profile-container {
        max-width: 800px;
        margin: 2rem auto;
        padding: 16px;
      }
      .full-width {
        width: 100%;
        margin-bottom: 16px;
      }
      .form-row {
        display: flex;
        flex-direction: row;
        gap: 16px;
        margin-bottom: 16px;
      }
      .form-actions {
        display: flex;
        justify-content: flex-end;
        gap: 16px;
        margin-top: 24px;
      }
    `,
  ],
})
export class ProfileComponent implements OnInit {
  profileForm!: FormGroup;
  isLoading = false;
  currentProfile: JobSeekerProfile | null = null;
  isEditing = false;

  constructor(
    private fb: FormBuilder,
    private profileService: JobSeekerProfileService,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      headline: [''],
      summary: [''],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      location: [''],
      currentJobTitle: [''],
      yearsOfExperience: [0],
      preferredJobType: [''],
      preferredLocation: [''],
      linkedinUrl: [''],
      githubUrl: [''],
      portfolioUrl: [''],
      availabilityStatus: ['actively_looking'],
    });

    this.loadProfile();
  }

  loadProfile(): void {
    this.isLoading = true;
    this.profileService.getProfile().subscribe({
      next: (res) => {
        this.currentProfile = res.data;
        this.profileForm.patchValue(this.currentProfile);
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.snackBar.open('Error loading profile.', 'Close', { duration: 3000 });
        this.isLoading = false;
      },
    });
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      this.isLoading = true;
      const data = this.profileForm.value;

      if (this.currentProfile?.id) {
        this.profileService.updateProfile(this.currentProfile.id, data).subscribe({
          next: (res) => {
            this.snackBar.open('Profile updated successfully!', 'Close', { duration: 3000 });
            this.currentProfile = res.data;
            this.isEditing = false;
            this.isLoading = false;
          },
          error: () => {
            this.snackBar.open('Update failed. Try again.', 'Close', { duration: 3000 });
            this.isLoading = false;
          },
        });
      }
    }
  }
}
