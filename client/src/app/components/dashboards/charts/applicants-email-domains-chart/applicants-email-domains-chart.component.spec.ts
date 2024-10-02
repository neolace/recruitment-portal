import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantsEmailDomainsChartComponent } from './applicants-email-domains-chart.component';

describe('ApplicantsEmailDomainsChartComponent', () => {
  let component: ApplicantsEmailDomainsChartComponent;
  let fixture: ComponentFixture<ApplicantsEmailDomainsChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicantsEmailDomainsChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplicantsEmailDomainsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
