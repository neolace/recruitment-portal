import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantsPerJobBarChartComponent } from './applicants-per-job-bar-chart.component';

describe('ApplicantsPerJobBarChartComponent', () => {
  let component: ApplicantsPerJobBarChartComponent;
  let fixture: ComponentFixture<ApplicantsPerJobBarChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicantsPerJobBarChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplicantsPerJobBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
