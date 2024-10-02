import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeDownloadRatesChartComponent } from './resume-download-rates-chart.component';

describe('ResumeDownloadRatesChartComponent', () => {
  let component: ResumeDownloadRatesChartComponent;
  let fixture: ComponentFixture<ResumeDownloadRatesChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResumeDownloadRatesChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResumeDownloadRatesChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
