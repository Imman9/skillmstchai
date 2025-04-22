import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  AbstractControl,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-form-validation',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
  ],
  template: `
    <div
      class="validation-messages"
      *ngIf="control && control.invalid && (control.dirty || control.touched)"
    >
      <div class="error-message" *ngIf="control.hasError('required')">
        <mat-icon>error</mat-icon>
        <span>{{ fieldName }} is required</span>
      </div>
      <div class="error-message" *ngIf="control.hasError('email')">
        <mat-icon>error</mat-icon>
        <span>Please enter a valid email address</span>
      </div>
      <div class="error-message" *ngIf="control.hasError('minlength')">
        <mat-icon>error</mat-icon>
        <span
          >{{ fieldName }} must be at least
          {{ control.getError('minlength').requiredLength }} characters</span
        >
      </div>
      <div class="error-message" *ngIf="control.hasError('maxlength')">
        <mat-icon>error</mat-icon>
        <span
          >{{ fieldName }} cannot exceed
          {{ control.getError('maxlength').requiredLength }} characters</span
        >
      </div>
      <div class="error-message" *ngIf="control.hasError('pattern')">
        <mat-icon>error</mat-icon>
        <span>{{ getPatternErrorMessage() }}</span>
      </div>
      <div class="error-message" *ngIf="control.hasError('min')">
        <mat-icon>error</mat-icon>
        <span
          >{{ fieldName }} must be at least
          {{ control.getError('min').min }}</span
        >
      </div>
      <div class="error-message" *ngIf="control.hasError('max')">
        <mat-icon>error</mat-icon>
        <span
          >{{ fieldName }} cannot exceed {{ control.getError('max').max }}</span
        >
      </div>
      <div class="error-message" *ngIf="control.hasError('custom')">
        <mat-icon>error</mat-icon>
        <span>{{ control.getError('custom') }}</span>
      </div>
    </div>
  `,
  styles: [
    `
      .validation-messages {
        margin-top: 4px;
      }

      .error-message {
        display: flex;
        align-items: center;
        color: #f44336;
        font-size: 12px;
        margin-top: 4px;
      }

      .error-message mat-icon {
        font-size: 16px;
        width: 16px;
        height: 16px;
        margin-right: 4px;
      }
    `,
  ],
})
export class FormValidationComponent {
  @Input() control: AbstractControl | null = null;
  @Input() fieldName: string = 'This field';

  getPatternErrorMessage(): string {
    const pattern = this.control?.getError('pattern')?.requiredPattern;
    if (!pattern) return 'Invalid format';

    // Common pattern error messages
    const patternMessages: { [key: string]: string } = {
      '^[a-zA-Z]*$': 'Only letters are allowed',
      '^[0-9]*$': 'Only numbers are allowed',
      '^[a-zA-Z0-9]*$': 'Only letters and numbers are allowed',
      '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$':
        'Please enter a valid email address',
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$':
        'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one number',
    };

    return patternMessages[pattern] || 'Invalid format';
  }
}
