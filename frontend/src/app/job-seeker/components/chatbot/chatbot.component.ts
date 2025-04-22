import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressBarModule } from '@angular/material/progress-bar';

interface Message {
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  loading?: boolean;
}

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatChipsModule,
    MatProgressBarModule,
  ],
  template: `
    <div class="chatbot-container">
      <mat-card class="chatbot-card">
        <mat-card-header>
          <mat-card-title>Database Query Assistant</mat-card-title>
          <mat-card-subtitle>Ask questions about your data</mat-card-subtitle>
        </mat-card-header>

        <mat-card-content class="chat-content">
          <div class="messages-container">
            <div
              *ngFor="let message of messages"
              [class]="'message ' + message.type"
            >
              <div class="message-content">
                <div class="message-text">{{ message.content }}</div>
                <div class="message-time">
                  {{ message.timestamp | date : 'shortTime' }}
                </div>
              </div>
              <mat-progress-bar
                *ngIf="message.loading"
                mode="indeterminate"
              ></mat-progress-bar>
            </div>
          </div>

          <div class="suggested-queries">
            <mat-chip-set>
              <mat-chip
                *ngFor="let query of suggestedQueries"
                (click)="sendMessage(query)"
              >
                {{ query }}
              </mat-chip>
            </mat-chip-set>
          </div>

          <div class="input-container">
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Type your question</mat-label>
              <input
                matInput
                [(ngModel)]="userInput"
                (keyup.enter)="sendMessage(userInput)"
                placeholder="e.g., Show me my skill progress"
              />
              <button
                mat-icon-button
                matSuffix
                (click)="sendMessage(userInput)"
              >
                <mat-icon>send</mat-icon>
              </button>
            </mat-form-field>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [
    `
      .chatbot-container {
        padding: 20px;
        max-width: 800px;
        margin: 0 auto;
      }

      .chatbot-card {
        height: 100%;
      }

      .chat-content {
        display: flex;
        flex-direction: column;
        height: calc(100vh - 200px);
        padding: 16px;
      }

      .messages-container {
        flex: 1;
        overflow-y: auto;
        padding: 16px;
        margin-bottom: 16px;
        background-color: #f5f5f5;
        border-radius: 8px;
      }

      .message {
        margin-bottom: 16px;
        max-width: 80%;
      }

      .message.user {
        margin-left: auto;
      }

      .message.bot {
        margin-right: auto;
      }

      .message-content {
        padding: 12px;
        border-radius: 8px;
        background-color: white;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }

      .message.user .message-content {
        background-color: #e3f2fd;
      }

      .message-text {
        margin-bottom: 4px;
      }

      .message-time {
        font-size: 12px;
        color: #666;
        text-align: right;
      }

      .suggested-queries {
        margin-bottom: 16px;
      }

      .input-container {
        margin-top: auto;
      }

      .full-width {
        width: 100%;
      }

      mat-chip {
        cursor: pointer;
      }

      mat-chip:hover {
        background-color: #e0e0e0;
      }
    `,
  ],
})
export class ChatbotComponent {
  userInput = '';
  messages: Message[] = [];
  suggestedQueries = [
    'Show me my skill progress',
    'What are my top skills?',
    'Which skills need improvement?',
    'Compare my skills with job requirements',
  ];

  constructor() {
    // Add welcome message
    this.messages.push({
      type: 'bot',
      content:
        'Hello! I can help you analyze your skills and career data. What would you like to know?',
      timestamp: new Date(),
    });
  }

  async sendMessage(message: string) {
    if (!message.trim()) return;

    // Add user message
    this.messages.push({
      type: 'user',
      content: message,
      timestamp: new Date(),
    });

    // Clear input
    this.userInput = '';

    // Add loading message
    const loadingMessage: Message = {
      type: 'bot',
      content: 'Thinking...',
      timestamp: new Date(),
      loading: true,
    };
    this.messages.push(loadingMessage);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Remove loading message
    this.messages = this.messages.filter((m) => m !== loadingMessage);

    // Add bot response
    this.messages.push({
      type: 'bot',
      content: this.generateResponse(message),
      timestamp: new Date(),
    });
  }

  private generateResponse(query: string): string {
    // This is a placeholder for actual AI/API integration
    const responses: { [key: string]: string } = {
      'Show me my skill progress':
        'Your skill progress shows significant improvement in JavaScript (85%) and Angular (80%). Your soft skills are also developing well.',
      'What are my top skills':
        'Your top skills are: JavaScript (90%), Communication (95%), and Team Leadership (80%).',
      'Which skills need improvement':
        'Based on your profile, you could improve: AWS (70%), System Design (65%), and Project Management (75%).',
      'Compare my skills with job requirements':
        'Your skills match 85% of the requirements for Senior Frontend Developer positions. You excel in technical skills but could improve in cloud technologies.',
    };

    return (
      responses[query] ||
      'I can help you analyze your skills and career data. Try asking about your skill progress, top skills, or areas for improvement.'
    );
  }
}
