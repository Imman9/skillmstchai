import { Component, OnInit, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { SkillsService } from '../../../core/services/skills.service';
import { JobSeekerSkillsService } from '../../../core/services/job-seeker-skills.service';
import { Skill, SkillCategory, JobSeekerSkill, AddSkillRequest, UpdateSkillRequest } from '../../../core/models/skill.model';
import { EditSkillDialogComponent } from './edit-skill-dialog.component';
import { DeleteSkillDialogComponent } from './delete-skill-dialog.component';
import { AddSkillDialogComponent } from './add-skill-dialog.component';
import { ToastNotificationComponent } from '../../../shared/components/toast-notification/toast-notification.component';

interface CategoryWithSkills {
  name: string;
  skills: JobSeekerSkill[];
}

@Component({
  selector: 'app-skill-management',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatProgressBarModule,
    MatExpansionModule,
    MatDividerModule,
    MatDialogModule,
    MatTooltipModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule
  ],
  providers: [SkillsService, JobSeekerSkillsService],
  template: `
    <div class="skills-container">
      <mat-card class="header-card">
        <mat-card-header>
          <mat-card-title>Skills Management</mat-card-title>
          <mat-card-subtitle>Track and improve your professional skills</mat-card-subtitle>
        </mat-card-header>
        <mat-card-actions align="end">
          <button mat-raised-button color="primary" (click)="openAddSkillDialog()">
            Add New Skill
          </button>
        </mat-card-actions>
      </mat-card>

      <div class="skills-content">
        <mat-card class="assessment-card">
          <mat-card-header>
            <mat-card-title>Skill Assessment Overview</mat-card-title>
            <mat-card-subtitle>Track your skill verification progress</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <div class="assessment-stats">
              <div class="stat-item">
                <div class="stat-value">{{ getTotalSkills() }}</div>
                <div class="stat-label">Total Skills</div>
              </div>
              <div class="stat-item">
                <div class="stat-value">{{ getVerifiedSkills() }}</div>
                <div class="stat-label">Verified Skills</div>
              </div>
              <div class="stat-item">
                <div class="stat-value">{{ getTotalEndorsements() }}</div>
                <div class="stat-label">Endorsements</div>
              </div>
              <div class="stat-item">
                <div class="stat-value">{{ getAverageProficiency() | number:'1.1-1' }}</div>
                <div class="stat-label">Avg. Proficiency</div>
              </div>
            </div>
          </mat-card-content>
        </mat-card>

        <div class="skills-grid">
          <mat-expansion-panel *ngFor="let category of skillCategories" class="category-panel">
            <mat-expansion-panel-header>
              <mat-panel-title>{{ category.name }}</mat-panel-title>
              <mat-panel-description>{{ category.skills.length }} skills</mat-panel-description>
            </mat-expansion-panel-header>

            <div class="skill-list">
              <div *ngFor="let jobSkill of category.skills" class="skill-item">
                <div class="skill-header">
                  <div class="skill-info">
                    <div class="skill-name">
                      {{ jobSkill.skill.name }}
                      <mat-icon *ngIf="jobSkill.is_verified" matTooltip="Verified Skill" class="verified-icon">verified</mat-icon>
                    </div>
                    <div class="skill-meta">
                      {{ jobSkill.years_of_experience }} years · Last used {{ jobSkill.last_used_date | date }}
                    </div>
                  </div>
                  <mat-chip-set>
                    <mat-chip [class]="getProficiencyClass(jobSkill.proficiency_level)">
                      {{ getProficiencyLabel(jobSkill.proficiency_level) }}
                    </mat-chip>
                  </mat-chip-set>
                </div>

                <div class="skill-progress">
                  <mat-progress-bar
                    mode="determinate"
                    [value]="jobSkill.proficiency_level * 20"
                    [class]="getProficiencyClass(jobSkill.proficiency_level)"
                  ></mat-progress-bar>
                </div>

                <div class="skill-details">
                  <span class="endorsements" [matTooltip]="getEndorsementNames(jobSkill)">
                    <mat-icon>recommend</mat-icon>
                    {{ getEndorsementNames(jobSkill) }}
                  </span>
                  <span class="skill-actions">
                    <button mat-button color="primary" *ngIf="!jobSkill.is_verified" (click)="startSkillAssessment(jobSkill)">
                      <mat-icon>assessment</mat-icon>
                      Verify Skill
                    </button>
                    <button mat-button (click)="updateSkill(jobSkill)">Update</button>
                    <button mat-button color="warn" (click)="removeSkill(jobSkill)">
                      <mat-icon>delete</mat-icon>
                    </button>
                  </span>
                </div>

                <mat-divider></mat-divider>
              </div>
            </div>
          </mat-expansion-panel>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .skills-container {
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
    }

    .header-card {
      margin-bottom: 20px;
    }

    .skills-content {
      display: grid;
      gap: 20px;
    }

    .assessment-card {
      margin-bottom: 20px;
    }

    .assessment-stats {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 20px;
      margin-top: 20px;
    }

    .stat-item {
      text-align: center;
      padding: 16px;
      background-color: #f5f5f5;
      border-radius: 8px;
    }

    .stat-value {
      font-size: 24px;
      font-weight: 500;
      color: #1976d2;
      margin-bottom: 4px;
    }

    .stat-label {
      color: rgba(0, 0, 0, 0.6);
      font-size: 14px;
    }

    .category-panel {
      margin-bottom: 16px;
    }

    .skill-list {
      margin-top: 16px;
    }

    .skill-item {
      padding: 16px 0;
    }

    .skill-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 8px;
    }

    .skill-info {
      flex: 1;
    }

    .skill-name {
      font-weight: 500;
      font-size: 16px;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .skill-meta {
      font-size: 14px;
      color: rgba(0, 0, 0, 0.6);
      margin-top: 4px;
    }

    .verified-icon {
      color: #388e3c;
      font-size: 18px;
      width: 18px;
      height: 18px;
    }

    .skill-progress {
      margin: 12px 0;
    }

    .skill-details {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 8px 0;
    }

    .endorsements {
      display: flex;
      align-items: center;
      gap: 4px;
      color: rgba(0, 0, 0, 0.6);
      font-size: 14px;
    }

    .skill-actions {
      display: flex;
      gap: 8px;
    }

    .beginner { color: #fb8c00 !important; }
    .intermediate { color: #1976d2 !important; }
    .advanced { color: #388e3c !important; }
    .expert { color: #7b1fa2 !important; }
    .master { color: #c62828 !important; }
  `]
})
export class SkillManagementComponent implements OnInit {
  skillCategories: CategoryWithSkills[] = [];
  loading = false;
  skills: JobSeekerSkill[] = [];
  isLoading = false;

  constructor(
    private skillsService: SkillsService,
    private jobSeekerSkillsService: JobSeekerSkillsService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadSkills();
  }

  loadSkills(): void {
    this.isLoading = true;
    this.jobSeekerSkillsService.getCurrentUserSkills  ().subscribe({
      next: (skills) => {
        this.skills = skills;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading skills:', error);
        this.snackBar.openFromComponent(ToastNotificationComponent, {
          data: {
            message: 'Error loading skills. Please try again.',
            type: 'error',
            duration: 5000,
          },
        });
        this.isLoading = false;
      }
    });
  }

  getTotalSkills(): number {
    return this.skills.length;
  }

  getVerifiedSkills(): number {
    return this.skills.filter(skill => skill.is_verified).length;
  }

  getTotalEndorsements(): number {
    return 0;
  }

  getAverageProficiency(): number {
    const totalSkills = this.skills.length;
    if (totalSkills === 0) return 0;
    
    const totalProficiency = this.skills.reduce((total, skill) => total + skill.proficiency_level, 0);
    
    return totalProficiency / totalSkills;
  }

  getProficiencyClass(level: number): string {
    const classes = {
      1: 'beginner',
      2: 'intermediate',
      3: 'advanced',
      4: 'expert',
      5: 'master'
    };
    return classes[level as keyof typeof classes] || 'beginner';
  }

  getProficiencyLabel(level: number): string {
    const labels = {
      1: 'Beginner',
      2: 'Intermediate',
      3: 'Advanced',
      4: 'Expert',
      5: 'Master'
    };
    return labels[level as keyof typeof labels] || 'Beginner';
  }

  getEndorsementNames(jobSkill: JobSeekerSkill): string {
    return '';
  }

  openAddSkillDialog(): void {
    const dialogRef = this.dialog.open(AddSkillDialogComponent, {
      width: '500px',
      data: { skills: this.skills }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.isLoading = true;
        this.jobSeekerSkillsService.createSkill(result).subscribe({
          next: (newSkill) => {
            this.skills.push(newSkill);
            this.snackBar.openFromComponent(ToastNotificationComponent, {
              data: {
                message: 'Skill added successfully',
                type: 'success',
                duration: 3000,
              },
            });
            this.isLoading = false;
          },
          error: (error) => {
            console.error('Error adding skill:', error);
            this.snackBar.openFromComponent(ToastNotificationComponent, {
              data: {
                message: 'Error adding skill. Please try again.',
                type: 'error',
                duration: 5000,
              },
            });
            this.isLoading = false;
          }
        });
      }
    });
  }

  startSkillAssessment(jobSkill: JobSeekerSkill): void {
    // TODO: Implement skill assessment flow
    this.snackBar.openFromComponent(ToastNotificationComponent, {
      data: {
        message: 'Skill assessment started',
        type: 'success',
        duration: 3000,
      },
    });
  }

  updateSkill(jobSkill: JobSeekerSkill): void {
    const dialogRef = this.dialog.open(EditSkillDialogComponent, {
      width: '500px',
      data: { skill: jobSkill }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.jobSeekerSkillsService.updateSkill(jobSkill.id, result).subscribe({
          next: (updatedSkill) => {
            const index = this.skills.findIndex(s => s.id === updatedSkill.id);
            if (index !== -1) {
              this.skills[index] = updatedSkill;
            }
            this.snackBar.openFromComponent(ToastNotificationComponent, {
              data: {
                message: 'Skill updated successfully',
                type: 'success',
                duration: 3000,
              },
            });
          },
          error: (error) => {
            console.error('Error updating skill:', error);
            this.snackBar.openFromComponent(ToastNotificationComponent, {
              data: {
                message: 'Error updating skill. Please try again.',
                type: 'error',
                duration: 5000,
              },
            });
          }
        });
      }
    });
  }

  removeSkill(jobSkill: JobSeekerSkill): void {
    const dialogRef = this.dialog.open(DeleteSkillDialogComponent, {
      width: '400px',
      data: { skill: jobSkill }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.jobSeekerSkillsService.deleteSkill(jobSkill.id).subscribe({
          next: () => {
            this.skills = this.skills.filter(s => s.id !== jobSkill.id);
            this.snackBar.openFromComponent(ToastNotificationComponent, {
              data: {
                message: 'Skill deleted successfully',
                type: 'success',
                duration: 3000,
              },
            });
          },
          error: (error) => {
            console.error('Error deleting skill:', error);
            this.snackBar.openFromComponent(ToastNotificationComponent, {
              data: {
                message: 'Error deleting skill. Please try again.',
                type: 'error',
                duration: 5000,
              },
            });
          }
        });
      }
    });
  }
}
