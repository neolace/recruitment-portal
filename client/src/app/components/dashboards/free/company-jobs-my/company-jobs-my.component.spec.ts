import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyJobsMyComponent } from './company-jobs-my.component';

describe('CompanyJobsMyComponent', () => {
  let component: CompanyJobsMyComponent;
  let fixture: ComponentFixture<CompanyJobsMyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyJobsMyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyJobsMyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
