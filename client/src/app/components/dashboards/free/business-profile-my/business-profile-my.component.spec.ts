import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessProfileMyComponent } from './business-profile-my.component';

describe('BusinessProfileMyComponent', () => {
  let component: BusinessProfileMyComponent;
  let fixture: ComponentFixture<BusinessProfileMyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessProfileMyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusinessProfileMyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
