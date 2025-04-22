import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-rich-text-editor',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
  ],
  template: `
    <div class="editor-container">
      <mat-toolbar class="editor-toolbar">
        <button mat-icon-button (click)="formatText('bold')">
          <mat-icon>format_bold</mat-icon>
        </button>
        <button mat-icon-button (click)="formatText('italic')">
          <mat-icon>format_italic</mat-icon>
        </button>
        <button mat-icon-button (click)="formatText('underline')">
          <mat-icon>format_underlined</mat-icon>
        </button>
        <button mat-icon-button (click)="formatText('list')">
          <mat-icon>format_list_bulleted</mat-icon>
        </button>
        <button mat-icon-button (click)="formatText('number')">
          <mat-icon>format_list_numbered</mat-icon>
        </button>
        <button mat-icon-button (click)="formatText('link')">
          <mat-icon>link</mat-icon>
        </button>
      </mat-toolbar>
      <mat-form-field class="editor-field" appearance="outline">
        <textarea
          matInput
          [(ngModel)]="content"
          (ngModelChange)="onContentChange($event)"
          [placeholder]="placeholder"
          [readonly]="readOnly"
          [style.height]="height"
          [style.min-height]="minHeight"
          [style.max-height]="maxHeight"
        ></textarea>
      </mat-form-field>
    </div>
  `,
  styles: [
    `
      .editor-container {
        margin: 16px 0;
      }

      .editor-toolbar {
        background-color: #f5f5f5;
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
        padding: 4px;
        min-height: 40px;
      }

      .editor-field {
        width: 100%;
      }

      textarea {
        font-family: inherit;
        line-height: 1.5;
        padding: 12px;
      }
    `,
  ],
})
export class RichTextEditorComponent {
  @Input() content: string = '';
  @Input() height: string = 'auto';
  @Input() minHeight: string = '200px';
  @Input() maxHeight: string = '500px';
  @Input() placeholder: string = 'Type your content here...';
  @Input() readOnly: boolean = false;
  @Output() contentChange = new EventEmitter<string>();

  formatText(format: string): void {
    // This is a simplified version. In a real application, you would use
    // document.execCommand or a more sophisticated approach
    const textarea = document.querySelector('textarea');
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const selectedText = this.content.substring(start, end);

      let formattedText = '';
      switch (format) {
        case 'bold':
          formattedText = `<strong>${selectedText}</strong>`;
          break;
        case 'italic':
          formattedText = `<em>${selectedText}</em>`;
          break;
        case 'underline':
          formattedText = `<u>${selectedText}</u>`;
          break;
        case 'list':
          formattedText = `\n• ${selectedText}\n`;
          break;
        case 'number':
          formattedText = `\n1. ${selectedText}\n`;
          break;
        case 'link':
          formattedText = `<a href="#">${selectedText}</a>`;
          break;
      }

      this.content =
        this.content.substring(0, start) +
        formattedText +
        this.content.substring(end);
      this.onContentChange(this.content);
    }
  }

  onContentChange(content: string): void {
    this.contentChange.emit(content);
  }
}
