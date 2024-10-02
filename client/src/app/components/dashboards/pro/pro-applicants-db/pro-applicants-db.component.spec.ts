import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProApplicantsDbComponent } from './pro-applicants-db.component';

describe('ProApplicantsDbComponent', () => {
  let component: ProApplicantsDbComponent;
  let fixture: ComponentFixture<ProApplicantsDbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProApplicantsDbComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProApplicantsDbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
