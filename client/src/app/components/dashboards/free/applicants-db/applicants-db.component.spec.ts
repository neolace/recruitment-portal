import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantsDbComponent } from './applicants-db.component';

describe('ApplicantsDbComponent', () => {
  let component: ApplicantsDbComponent;
  let fixture: ComponentFixture<ApplicantsDbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicantsDbComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplicantsDbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
