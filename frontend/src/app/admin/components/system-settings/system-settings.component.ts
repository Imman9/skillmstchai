import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-system-settings',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatSlideToggleModule,
  ],
  template: `
    <div class="max-w-4xl mx-auto p-6">
      <mat-card class="p-6">
        <mat-card-header class="mb-6">
          <mat-card-title class="text-2xl font-bold text-gray-800"
            >System Settings</mat-card-title
          >
        </mat-card-header>

        <form [formGroup]="settingsForm" class="space-y-4">
          <mat-form-field class="w-full">
            <mat-label>System Name</mat-label>
            <input matInput formControlName="systemName" />
          </mat-form-field>

          <mat-form-field class="w-full">
            <mat-label>Default Language</mat-label>
            <mat-select formControlName="defaultLanguage">
              <mat-option value="en">English</mat-option>
              <mat-option value="es">Spanish</mat-option>
              <mat-option value="fr">French</mat-option>
            </mat-select>
          </mat-form-field>

          <mat-slide-toggle formControlName="enableNotifications">
            Enable Notifications
          </mat-slide-toggle>

          <mat-slide-toggle formControlName="enableAnalytics">
            Enable Analytics
          </mat-slide-toggle>

          <button
            mat-raised-button
            color="primary"
            type="submit"
            class="w-full"
          >
            Save Settings
          </button>
        </form>
      </mat-card>
    </div>
  `,
})
export class SystemSettingsComponent {
  settingsForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.settingsForm = this.fb.group({
      systemName: ['SkillsMatch AI'],
      defaultLanguage: ['en'],
      enableNotifications: [true],
      enableAnalytics: [true],
    });

    // Load saved settings from localStorage
    const savedSettings = localStorage.getItem('systemSettings');
    if (savedSettings) {
      this.settingsForm.patchValue(JSON.parse(savedSettings));
    }
  }

  onSubmit(): void {
    if (this.settingsForm.valid) {
      localStorage.setItem(
        'systemSettings',
        JSON.stringify(this.settingsForm.value)
      );
    }
  }
}
