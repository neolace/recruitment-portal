import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantsStatusDoughnutChartComponent } from './applicants-status-doughnut-chart.component';

describe('ApplicantsStatusDoughnutChartComponent', () => {
  let component: ApplicantsStatusDoughnutChartComponent;
  let fixture: ComponentFixture<ApplicantsStatusDoughnutChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicantsStatusDoughnutChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplicantsStatusDoughnutChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
