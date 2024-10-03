import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleJobPostAnalysisComponent } from './single-job-post-analysis.component';

describe('SingleJobPostAnalysisComponent', () => {
  let component: SingleJobPostAnalysisComponent;
  let fixture: ComponentFixture<SingleJobPostAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleJobPostAnalysisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleJobPostAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
