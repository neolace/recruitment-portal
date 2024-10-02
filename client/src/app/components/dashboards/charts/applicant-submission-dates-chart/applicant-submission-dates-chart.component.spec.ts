import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantSubmissionDatesChartComponent } from './applicant-submission-dates-chart.component';

describe('ApplicantSubmissionDatesChartComponent', () => {
  let component: ApplicantSubmissionDatesChartComponent;
  let fixture: ComponentFixture<ApplicantSubmissionDatesChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicantSubmissionDatesChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplicantSubmissionDatesChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
