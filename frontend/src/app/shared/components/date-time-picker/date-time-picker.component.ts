import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-date-time-picker',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
  ],
  template: `
    <div class="date-time-picker">
      <mat-form-field appearance="outline">
        <mat-label>{{ label }}</mat-label>
        <input
          matInput
          [matDatepicker]="picker"
          [(ngModel)]="dateTime"
          (ngModelChange)="onDateTimeChange($event)"
          [min]="minDate"
          [max]="maxDate"
          [disabled]="disabled"
        />
        <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
        <mat-datepicker #picker></mat-datepicker>
      </mat-form-field>

      <mat-form-field appearance="outline" *ngIf="showTime">
        <mat-label>Time</mat-label>
        <input
          matInput
          type="time"
          [(ngModel)]="time"
          (ngModelChange)="onTimeChange($event)"
          [disabled]="disabled"
        />
      </mat-form-field>
    </div>
  `,
  styles: [
    `
      .date-time-picker {
        display: flex;
        gap: 16px;
        align-items: center;
      }

      mat-form-field {
        width: 100%;
      }
    `,
  ],
})
export class DateTimePickerComponent {
  @Input() label: string = 'Date';
  @Input() showTime: boolean = true;
  @Input() minDate: Date | null = null;
  @Input() maxDate: Date | null = null;
  @Input() disabled: boolean = false;
  @Output() dateTimeChange = new EventEmitter<Date>();

  private _dateTime: Date = new Date();
  time: string = '00:00';

  @Input()
  get dateTime(): Date {
    return this._dateTime;
  }

  set dateTime(value: Date) {
    this._dateTime = value;
    this.time = this.formatTime(value);
  }

  onDateTimeChange(date: Date): void {
    if (date) {
      const [hours, minutes] = this.time.split(':').map(Number);
      date.setHours(hours, minutes);
      this._dateTime = date;
      this.dateTimeChange.emit(date);
    }
  }

  onTimeChange(time: string): void {
    this.time = time;
    const [hours, minutes] = time.split(':').map(Number);
    this._dateTime.setHours(hours, minutes);
    this.dateTimeChange.emit(this._dateTime);
  }

  private formatTime(date: Date): string {
    return `${this.padZero(date.getHours())}:${this.padZero(
      date.getMinutes()
    )}`;
  }

  private padZero(num: number): string {
    return num.toString().padStart(2, '0');
  }
}
