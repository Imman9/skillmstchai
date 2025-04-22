import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { JobSeekerSkill, Skill } from '../../../core/models/skill.model';
import { SkillsService } from '../../../core/services/skills.service';

@Component({
  selector: 'app-add-skill-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule
  ],
  template: `
    <h2 mat-dialog-title>Add New Skill</h2>
    <mat-dialog-content>
      <form [formGroup]="skillForm">
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Select Skill</mat-label>
          <mat-select formControlName="skill_id" required>
            <mat-option *ngFor="let skill of availableSkills" [value]="skill.id">
              {{skill.name}} ({{skill.category?.name || 'Uncategorized'}})
            </mat-option>
          </mat-select>
          <mat-error *ngIf="skillForm.get('skill_id')?.hasError('required')">
            Please select a skill
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Proficiency Level</mat-label>
          <mat-select formControlName="proficiency_level" required>
            <mat-option [value]="1">Beginner</mat-option>
            <mat-option [value]="2">Intermediate</mat-option>
            <mat-option [value]="3">Advanced</mat-option>
            <mat-option [value]="4">Expert</mat-option>
          </mat-select>
          <mat-error *ngIf="skillForm.get('proficiency_level')?.hasError('required')">
            Proficiency level is required
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Years of Experience</mat-label>
          <input matInput type="number" formControlName="years_of_experience" min="0" required>
          <mat-error *ngIf="skillForm.get('years_of_experience')?.hasError('required')">
            Years of experience is required
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Last Used Date</mat-label>
          <input matInput [matDatepicker]="picker" formControlName="last_used_date">
          <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
          <mat-datepicker #picker></mat-datepicker>
        </mat-form-field>

        <mat-checkbox formControlName="is_primary">Set as primary skill</mat-checkbox>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onCancel()">Cancel</button>
      <button mat-raised-button color="primary" (click)="onSubmit()" [disabled]="!skillForm.valid">
        Add Skill
      </button>
    </mat-dialog-actions>
  `,
  styles: [`
    .full-width {
      width: 100%;
      margin-bottom: 16px;
    }
  `]
})
export class AddSkillDialogComponent implements OnInit {
  skillForm: FormGroup;
  availableSkills: Skill[] = [];
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private skillsService: SkillsService,
    public dialogRef: MatDialogRef<AddSkillDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { skills: JobSeekerSkill[] }
  ) {
    this.skillForm = this.fb.group({
      skill_id: ['', Validators.required],
      proficiency_level: [1, Validators.required],
      years_of_experience: [0, Validators.required],
      last_used_date: [null],
      is_primary: [false]
    });
  }

  ngOnInit(): void {
    this.loadAvailableSkills();
  }

  loadAvailableSkills(): void {
    if (this.isLoading) return;
    
    this.isLoading = true;
    this.skillsService.getAllSkills().subscribe({
      next: (skills) => {
        // Filter out skills that the user already has
        const existingSkillIds = this.data.skills.map(s => s.skill_id);
        this.availableSkills = skills.filter(skill => !existingSkillIds.includes(skill.id));
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading skills:', error);
        this.isLoading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.skillForm.valid) {
      this.dialogRef.close(this.skillForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
} 