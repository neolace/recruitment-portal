import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobViewersOverTimeLineChartComponent } from './job-viewers-over-time-line-chart.component';

describe('JobViewersOverTimeLineChartComponent', () => {
  let component: JobViewersOverTimeLineChartComponent;
  let fixture: ComponentFixture<JobViewersOverTimeLineChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobViewersOverTimeLineChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobViewersOverTimeLineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
