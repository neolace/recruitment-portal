import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyAnalysisComponent } from './company-analysis.component';

describe('CompanyAnalysisComponent', () => {
  let component: CompanyAnalysisComponent;
  let fixture: ComponentFixture<CompanyAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyAnalysisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
