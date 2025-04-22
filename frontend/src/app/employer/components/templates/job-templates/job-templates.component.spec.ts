import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobTemplatesComponent } from './job-templates.component';

describe('JobTemplatesComponent', () => {
  let component: JobTemplatesComponent;
  let fixture: ComponentFixture<JobTemplatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobTemplatesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobTemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
