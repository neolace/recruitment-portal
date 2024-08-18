import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessProfileSettingsComponent } from './business-profile-settings.component';

describe('BusinessProfileSettingsComponent', () => {
  let component: BusinessProfileSettingsComponent;
  let fixture: ComponentFixture<BusinessProfileSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessProfileSettingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusinessProfileSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
