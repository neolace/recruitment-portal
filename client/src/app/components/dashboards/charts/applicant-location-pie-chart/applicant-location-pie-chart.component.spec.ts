import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantLocationPieChartComponent } from './applicant-location-pie-chart.component';

describe('ApplicantLocationPieChartComponent', () => {
  let component: ApplicantLocationPieChartComponent;
  let fixture: ComponentFixture<ApplicantLocationPieChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicantLocationPieChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplicantLocationPieChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
