import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProCompanyAnalysisComponent } from './pro-company-analysis.component';

describe('ProCompanyAnalysisComponent', () => {
  let component: ProCompanyAnalysisComponent;
  let fixture: ComponentFixture<ProCompanyAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProCompanyAnalysisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProCompanyAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
