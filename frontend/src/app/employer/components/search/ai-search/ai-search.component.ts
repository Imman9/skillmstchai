import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressBarModule } from '@angular/material/progress-bar';

interface SearchResult {
  id: number;
  name: string;
  title: string;
  skills: string[];
  experience: string;
  location: string;
  matchScore: number;
  summary: string;
}

@Component({
  selector: 'app-ai-search',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatChipsModule,
    MatIconModule,
    MatSliderModule,
    MatExpansionModule,
    MatProgressBarModule,
  ],
  template: `
    <div class="search-container">
      <mat-card class="search-card">
        <mat-card-header>
          <mat-card-title>AI-Powered Candidate Search</mat-card-title>
          <mat-card-subtitle
            >Find the perfect candidates using natural
            language</mat-card-subtitle
          >
        </mat-card-header>

        <mat-card-content>
          <mat-form-field class="full-width" appearance="outline">
            <mat-label>Job Description or Requirements</mat-label>
            <textarea
              matInput
              [(ngModel)]="searchQuery"
              rows="4"
              placeholder="Describe the ideal candidate you're looking for..."
            ></textarea>
          </mat-form-field>

          <mat-expansion-panel>
            <mat-expansion-panel-header>
              <mat-panel-title>Advanced Filters</mat-panel-title>
            </mat-expansion-panel-header>

            <div class="filters-grid">
              <mat-form-field appearance="outline">
                <mat-label>Required Skills</mat-label>
                <input
                  matInput
                  placeholder="Add skills and press Enter"
                  #skillInput
                  (keyup.enter)="
                    addSkill(skillInput.value); skillInput.value = ''
                  "
                />
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Location</mat-label>
                <input
                  matInput
                  [(ngModel)]="location"
                  placeholder="City, State or Remote"
                />
              </mat-form-field>

              <div class="experience-filter">
                <label>Minimum Experience (years)</label>
                <mat-slider
                  min="0"
                  max="15"
                  step="1"
                  discrete
                  [displayWith]="formatLabel"
                >
                  <input matSliderThumb [(ngModel)]="minExperience" />
                </mat-slider>
              </div>
            </div>

            <mat-chip-set #chipSet>
              <mat-chip
                *ngFor="let skill of requiredSkills"
                (removed)="removeSkill(skill)"
              >
                {{ skill }}
                <button matChipRemove>
                  <mat-icon>cancel</mat-icon>
                </button>
              </mat-chip>
            </mat-chip-set>
          </mat-expansion-panel>

          <div class="search-actions">
            <button
              mat-raised-button
              color="primary"
              (click)="search()"
              [disabled]="!searchQuery"
            >
              Search Candidates
            </button>
          </div>
        </mat-card-content>
      </mat-card>

      <div class="results-section" *ngIf="searchResults.length > 0">
        <h2>Search Results</h2>
        <div class="results-grid">
          <mat-card
            class="result-card"
            *ngFor="let result of searchResults"
            [class.high-match]="result.matchScore >= 85"
          >
            <mat-card-header>
              <mat-card-title>{{ result.name }}</mat-card-title>
              <mat-card-subtitle>{{ result.title }}</mat-card-subtitle>
              <div class="match-score">
                <div class="score-label">Match</div>
                <div class="score-value">{{ result.matchScore }}%</div>
                <mat-progress-bar
                  mode="determinate"
                  [value]="result.matchScore"
                  [class.high-score]="result.matchScore >= 85"
                ></mat-progress-bar>
              </div>
            </mat-card-header>

            <mat-card-content>
              <p class="summary">{{ result.summary }}</p>

              <div class="details">
                <div class="detail-item">
                  <mat-icon>work</mat-icon>
                  <span>{{ result.experience }}</span>
                </div>
                <div class="detail-item">
                  <mat-icon>location_on</mat-icon>
                  <span>{{ result.location }}</span>
                </div>
              </div>

              <div class="skills-section">
                <mat-chip-set>
                  <mat-chip
                    *ngFor="let skill of result.skills"
                    color="primary"
                    selected
                  >
                    {{ skill }}
                  </mat-chip>
                </mat-chip-set>
              </div>
            </mat-card-content>

            <mat-card-actions>
              <button mat-button color="primary">
                <mat-icon>visibility</mat-icon>
                View Profile
              </button>
              <button mat-button color="primary">
                <mat-icon>mail</mat-icon>
                Contact
              </button>
            </mat-card-actions>
          </mat-card>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .search-container {
        padding: 20px;
        max-width: 1200px;
        margin: 0 auto;
      }

      .search-card {
        margin-bottom: 24px;
      }

      .full-width {
        width: 100%;
        margin-bottom: 16px;
      }

      .filters-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 16px;
        margin-bottom: 16px;
      }

      .experience-filter {
        grid-column: 1 / -1;
      }

      .search-actions {
        display: flex;
        justify-content: flex-end;
        margin-top: 16px;
      }

      .results-section {
        margin-top: 32px;
      }

      .results-section h2 {
        margin-bottom: 16px;
        color: rgba(0, 0, 0, 0.87);
        font-size: 20px;
        font-weight: 500;
      }

      .results-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
        gap: 20px;
      }

      .result-card {
        height: 100%;
      }

      .result-card.high-match {
        border: 2px solid #4caf50;
      }

      .match-score {
        position: absolute;
        right: 16px;
        top: 16px;
        text-align: right;
      }

      .score-label {
        font-size: 12px;
        color: rgba(0, 0, 0, 0.6);
      }

      .score-value {
        font-size: 24px;
        font-weight: 500;
        color: #1976d2;
        margin: 4px 0;
      }

      .high-score {
        color: #4caf50 !important;
      }

      .summary {
        margin: 16px 0;
        color: rgba(0, 0, 0, 0.87);
      }

      .details {
        display: flex;
        gap: 24px;
        margin-bottom: 16px;
      }

      .detail-item {
        display: flex;
        align-items: center;
        gap: 8px;
        color: rgba(0, 0, 0, 0.6);
      }

      .detail-item mat-icon {
        font-size: 20px;
        width: 20px;
        height: 20px;
      }

      .skills-section {
        margin: 16px 0;
      }

      mat-chip {
        margin: 4px;
      }

      mat-progress-bar {
        width: 100px;
        height: 4px;
        border-radius: 2px;
      }

      .mat-mdc-progress-bar.high-score .mdc-linear-progress__bar-inner {
        border-color: #4caf50;
      }

      @media (max-width: 768px) {
        .filters-grid {
          grid-template-columns: 1fr;
        }

        .results-grid {
          grid-template-columns: 1fr;
        }
      }
    `,
  ],
})
export class AiSearchComponent {
  searchQuery: string = '';
  requiredSkills: string[] = [];
  location: string = '';
  minExperience: number = 0;

  searchResults: SearchResult[] = [];

  formatLabel(value: number): string {
    return `${value}+ years`;
  }

  addSkill(skill: string): void {
    if (skill.trim() && !this.requiredSkills.includes(skill)) {
      this.requiredSkills.push(skill.trim());
    }
  }

  removeSkill(skill: string): void {
    const index = this.requiredSkills.indexOf(skill);
    if (index >= 0) {
      this.requiredSkills.splice(index, 1);
    }
  }

  search(): void {
    // Simulated search results
    this.searchResults = [
      {
        id: 1,
        name: 'John Smith',
        title: 'Senior Software Engineer',
        skills: ['JavaScript', 'TypeScript', 'Angular', 'Node.js'],
        experience: '8 years',
        location: 'San Francisco, CA',
        matchScore: 92,
        summary:
          'Experienced software engineer with a strong background in full-stack development and team leadership.',
      },
      {
        id: 2,
        name: 'Sarah Johnson',
        title: 'Full Stack Developer',
        skills: ['React', 'Node.js', 'Python', 'AWS'],
        experience: '5 years',
        location: 'Remote',
        matchScore: 85,
        summary:
          'Full stack developer with expertise in modern web technologies and cloud platforms.',
      },
      {
        id: 3,
        name: 'Michael Chen',
        title: 'Frontend Developer',
        skills: ['JavaScript', 'Vue.js', 'CSS', 'UI/UX'],
        experience: '3 years',
        location: 'New York, NY',
        matchScore: 78,
        summary:
          'Frontend specialist focused on creating responsive and accessible web applications.',
      },
    ];
  }
}
