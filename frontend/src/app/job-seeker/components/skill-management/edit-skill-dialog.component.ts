import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Skill, JobSeekerSkill, AddSkillRequest, UpdateSkillRequest } from '../../../core/models/skill.model';
import { SkillsService } from '../../../core/services/skills.service';
import { ToastNotificationComponent } from '../../../shared/components/toast-notification/toast-notification.component';

interface DialogData {
  mode: 'add' | 'edit';
  skill?: JobSeekerSkill;
}

@Component({
  selector: 'app-edit-skill-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule
  ],
  template: `
    <h2 mat-dialog-title>{{ data.mode === 'add' ? 'Add New Skill' : 'Edit Skill' }}</h2>
    <mat-dialog-content>
      <form [formGroup]="skillForm">
        <mat-form-field appearance="outline" class="w-full">
          <mat-label>Skill</mat-label>
          <mat-select formControlName="skill_id" [disabled]="data.mode === 'edit'">
            <mat-option *ngFor="let skill of availableSkills" [value]="skill.id">
              {{ skill.name }}
            </mat-option>
          </mat-select>
          <mat-error *ngIf="skillForm.get('skill_id')?.hasError('required')">
            Skill is required
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline" class="w-full">
          <mat-label>Proficiency Level</mat-label>
          <mat-select formControlName="proficiency_level">
            <mat-option [value]="1">Beginner</mat-option>
            <mat-option [value]="2">Intermediate</mat-option>
            <mat-option [value]="3">Advanced</mat-option>
            <mat-option [value]="4">Expert</mat-option>
            <mat-option [value]="5">Master</mat-option>
          </mat-select>
          <mat-error *ngIf="skillForm.get('proficiency_level')?.hasError('required')">
            Proficiency level is required
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline" class="w-full">
          <mat-label>Years of Experience</mat-label>
          <input matInput type="number" formControlName="years_of_experience" min="0" step="0.5">
          <mat-error *ngIf="skillForm.get('years_of_experience')?.hasError('required')">
            Years of experience is required
          </mat-error>
          <mat-error *ngIf="skillForm.get('years_of_experience')?.hasError('min')">
            Years of experience must be positive
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline" class="w-full">
          <mat-label>Last Used Date</mat-label>
          <input matInput [matDatepicker]="picker" formControlName="last_used_date">
          <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
          <mat-datepicker #picker></mat-datepicker>
          <mat-error *ngIf="skillForm.get('last_used_date')?.hasError('required')">
            Last used date is required
          </mat-error>
        </mat-form-field>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onCancel()">Cancel</button>
      <button mat-raised-button color="primary" (click)="onSave()" [disabled]="!skillForm.valid">
        {{ data.mode === 'add' ? 'Add' : 'Save' }}
      </button>
    </mat-dialog-actions>
  `,
  styles: [`
    .w-full {
      width: 100%;
      margin-bottom: 16px;
    }
  `]
})
export class EditSkillDialogComponent {
  skillForm: FormGroup;
  availableSkills: Skill[] = [];

  constructor(
    private fb: FormBuilder,
    private skillsService: SkillsService,
    public dialogRef: MatDialogRef<EditSkillDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.skillForm = this.fb.group({
      skill_id: [data.skill?.skill_id || null, Validators.required],
      proficiency_level: [data.skill?.proficiency_level || 1, Validators.required],
      years_of_experience: [data.skill?.years_of_experience || 0, [Validators.required, Validators.min(0)]],
      last_used_date: [data.skill?.last_used_date || null],
      is_primary: [data.skill?.is_primary || false]
    });

    this.loadAvailableSkills();
  }

  loadAvailableSkills(): void {
    this.skillsService.getAllSkills().subscribe({
      next: (skills) => {
        this.availableSkills = skills;
      },
      error: (error) => {
        console.error('Error loading skills:', error);
      }
    });
  }

  onSave(): void {
    if (this.skillForm.valid) {
      this.dialogRef.close(this.skillForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
} 