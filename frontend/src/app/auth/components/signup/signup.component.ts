import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';

// Shared Components
import { FormValidationComponent } from '../../../shared/components/form-validation/form-validation.component';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { ToastNotificationComponent } from '../../../shared/components/toast-notification/toast-notification.component';

@Component({
  selector: 'app-signup',
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
    MatSelectModule,
    RouterModule,
    FormValidationComponent,
    LoadingSpinnerComponent,
  ],
  template: `
    <div class="auth-container">
      <mat-card class="auth-card">
        <mat-card-header>
          <div class="header-content">
            <h1 class="app-title">SkillsMatch AI</h1>
            <mat-card-title>Create an Account</mat-card-title>
            <mat-card-subtitle
              >Join our professional community</mat-card-subtitle
            >
          </div>
        </mat-card-header>

        <mat-card-content>
          <form [formGroup]="signupForm" (ngSubmit)="onSubmit()">
            <div class="name-fields">
              <mat-form-field appearance="outline" class="half-width">
                <mat-label>First Name</mat-label>
                <input matInput formControlName="firstName" required />

                <app-form-validation
                  [control]="signupForm.get('firstName')"
                  fieldName="First name"
                ></app-form-validation>
              </mat-form-field>

              <mat-form-field appearance="outline" class="half-width">
                <mat-label>Last Name</mat-label>
                <input matInput formControlName="lastName" required />

                <app-form-validation
                  [control]="signupForm.get('lastName')"
                  fieldName="Last name"
                ></app-form-validation>
              </mat-form-field>
            </div>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Email</mat-label>
              <input matInput formControlName="email" type="email" required />

              <app-form-validation
                [control]="signupForm.get('email')"
                fieldName="Email"
              ></app-form-validation>
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Password</mat-label>
              <input
                matInput
                formControlName="password"
                [type]="hidePassword ? 'password' : 'text'"
                required
              />

              <app-form-validation
                [control]="signupForm.get('password')"
                fieldName="Password"
              ></app-form-validation>
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Confirm Password</mat-label>
              <input
                matInput
                formControlName="confirmPassword"
                [type]="hideConfirmPassword ? 'password' : 'text'"
                required
              />

              <app-form-validation
                [control]="signupForm.get('confirmPassword')"
                fieldName="Confirm password"
              ></app-form-validation>
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Account Type</mat-label>
              <mat-select formControlName="accountType" required>
                <mat-option value="JOB_SEEKER">Job Seeker</mat-option>
                <mat-option value="EMPLOYER">Employer</mat-option>
              </mat-select>

              <app-form-validation
                [control]="signupForm.get('accountType')"
                fieldName="Account type"
              ></app-form-validation>
            </mat-form-field>

            <div class="form-actions">
              <button
                mat-button
                type="button"
                routerLink="../login"
                class="login-link"
              >
                Already have an account? <span class="highlight">Login</span>
              </button>
              <button
                mat-raised-button
                color="primary"
                type="submit"
                [disabled]="!signupForm.valid || isLoading"
                class="submit-button"
              >
                <app-loading-spinner
                  *ngIf="isLoading"
                  [size]="24"
                ></app-loading-spinner>
                <span *ngIf="!isLoading">Sign Up</span>
              </button>
            </div>
          </form>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [
    `
      .auth-container {
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
        background: linear-gradient(135deg, #1976d2 0%, #2196f3 100%);
      }

      .auth-card {
        width: 100%;
        max-width: 450px;
        padding: 32px;
        border-radius: 16px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        background: rgba(255, 255, 255, 0.95);
      }

      .header-content {
        text-align: center;
        margin-bottom: 24px;
      }

      .app-title {
        font-size: 2rem;
        font-weight: 700;
        color: #2196f3;
        margin: 0 0 16px 0;
        letter-spacing: -0.5px;
      }

      mat-card-title {
        font-size: 1.5rem;
        font-weight: 600;
        color: #333;
        margin-bottom: 8px;
      }

      mat-card-subtitle {
        color: #666;
        font-size: 1rem;
      }

      .name-fields {
        display: flex;
        gap: 16px;
        margin-bottom: 16px;
      }

      .half-width {
        flex: 1;
      }

      .full-width {
        width: 100%;
        margin-bottom: 16px;
      }

      .form-icon {
        color: rgba(0, 0, 0, 0.4);
        font-size: 20px;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
      }

      .clickable {
        cursor: pointer;
        &:hover {
          color: #2196f3;
          transform: scale(1.1);
        }
      }

      .form-actions {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 24px;
      }

      .login-link {
        color: #666;
        .highlight {
          color: #1a237e;
          font-weight: 500;
        }
        &:hover {
          .highlight {
            text-decoration: underline;
          }
        }
      }

      .submit-button {
        min-width: 120px;
        padding: 8px 24px;
        font-weight: 500;
        background: linear-gradient(45deg, #1976d2, #2196f3);
        transition: all 0.3s ease;

        &:not([disabled]):hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(26, 35, 126, 0.2);
        }

        &[disabled] {
          background: #ccc;
        }
      }

      ::ng-deep {
        .mat-form-field-outline {
          color: #ddd !important;
        }

        .mat-form-field-outline-thick {
          color: #2196f3 !important;
        }

        .mat-form-field-label {
          color: #666 !important;
        }

        .mat-form-field.mat-focused .mat-form-field-label {
          color: #2196f3 !important;
        }

        .mat-form-field-suffix {
          top: 0 !important;
        }

        .mat-icon {
          display: flex !important;
          align-items: center;
          justify-content: center;
          line-height: 1;
        }

        .mat-form-field:hover {
          .mat-form-field-outline {
            opacity: 1;
          }
          .form-icon {
            color: rgba(0, 0, 0, 0.6);
          }
        }

        .mat-form-field.mat-focused {
          .form-icon {
            color: #2196f3;
          }
        }

        .mat-select-value {
          color: #333;
        }

        .mat-select-arrow {
          color: #666;
        }
      }

      @media (max-width: 600px) {
        .auth-card {
          padding: 24px;
        }

        .name-fields {
          flex-direction: column;
          gap: 0;
        }

        .form-actions {
          flex-direction: column;
          gap: 16px;
        }

        .submit-button {
          width: 100%;
        }

        .app-title {
          font-size: 1.75rem;
        }
      }
    `,
  ],
})
export class SignupComponent {
  signupForm: FormGroup;
  hidePassword = true;
  hideConfirmPassword = true;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.signupForm = this.fb.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', Validators.required],
        accountType: ['', Validators.required],
      },
      {
        validators: this.passwordMatchValidator,
      }
    );
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  onSubmit() {
    if (this.signupForm.valid) {
      this.isLoading = true;

      // Simulate API call
      setTimeout(() => {
        this.isLoading = false;
        this.snackBar.openFromComponent(ToastNotificationComponent, {
          data: {
            message: 'Account created successfully!',
            type: 'success',
            duration: 5000,
          },
        });
        this.router.navigate(['../login']);
      }, 2000);
    }
  }
}
