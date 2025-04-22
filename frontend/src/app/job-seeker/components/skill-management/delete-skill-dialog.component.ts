import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { JobSeekerSkill } from '../../../core/models/skill.model';

interface DialogData {
  skill: JobSeekerSkill;
}

@Component({
  selector: 'app-delete-skill-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ],
  template: `
    <h2 mat-dialog-title>Delete Skill</h2>
    <mat-dialog-content>
      <p>Are you sure you want to delete the skill "{{ data.skill.skill.name }}"?</p>
      <p>This action cannot be undone.</p>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onCancel()">Cancel</button>
      <button mat-raised-button color="warn" (click)="onDelete()">Delete</button>
    </mat-dialog-actions>
  `
})
export class DeleteSkillDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteSkillDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onDelete(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
} 