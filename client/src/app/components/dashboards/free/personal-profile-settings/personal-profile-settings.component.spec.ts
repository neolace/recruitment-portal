import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalProfileSettingsComponent } from './personal-profile-settings.component';

describe('PersonalProfileSettingsComponent', () => {
  let component: PersonalProfileSettingsComponent;
  let fixture: ComponentFixture<PersonalProfileSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalProfileSettingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonalProfileSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
