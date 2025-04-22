import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  template: `
    <div class="loading-container" [ngClass]="{ 'full-screen': fullScreen }">
      <mat-spinner
        [diameter]="size"
        [mode]="mode"
        [color]="color"
        [value]="value"
      ></mat-spinner>
      <div *ngIf="message" class="loading-message">{{ message }}</div>
    </div>
  `,
  styles: [
    `
      .loading-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 20px;
      }

      .full-screen {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(255, 255, 255, 0.8);
        z-index: 1000;
      }

      .loading-message {
        margin-top: 16px;
        font-size: 14px;
        color: #666;
      }
    `,
  ],
})
export class LoadingSpinnerComponent {
  @Input() size: number = 50;
  @Input() mode: 'determinate' | 'indeterminate' = 'indeterminate';
  @Input() color: 'primary' | 'accent' | 'warn' = 'primary';
  @Input() value: number = 0;
  @Input() message: string = '';
  @Input() fullScreen: boolean = false;
}
