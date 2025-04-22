import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatToolbarModule } from '@angular/material/toolbar';

// Import shared components
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { ToastNotificationComponent } from './components/toast-notification/toast-notification.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { RichTextEditorComponent } from './components/rich-text-editor/rich-text-editor.component';
import { DateTimePickerComponent } from './components/date-time-picker/date-time-picker.component';
import { FormValidationComponent } from './components/form-validation/form-validation.component';

@NgModule({
  declarations: [
    LoadingSpinnerComponent,
    ToastNotificationComponent,
    ConfirmationDialogComponent,
    FileUploadComponent,
    RichTextEditorComponent,
    DateTimePickerComponent,
    FormValidationComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatIconModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressBarModule,
    MatToolbarModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatIconModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressBarModule,
    MatToolbarModule,
    // Export shared components
    LoadingSpinnerComponent,
    ToastNotificationComponent,
    ConfirmationDialogComponent,
    FileUploadComponent,
    RichTextEditorComponent,
    DateTimePickerComponent,
    FormValidationComponent,
  ],
})
export class SharedModule {}
