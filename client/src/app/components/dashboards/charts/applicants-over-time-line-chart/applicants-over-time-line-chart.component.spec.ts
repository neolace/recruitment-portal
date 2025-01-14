import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantsOverTimeLineChartComponent } from './applicants-over-time-line-chart.component';

describe('ApplicantsOverTimeLineChartComponent', () => {
  let component: ApplicantsOverTimeLineChartComponent;
  let fixture: ComponentFixture<ApplicantsOverTimeLineChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplicantsOverTimeLineChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplicantsOverTimeLineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
