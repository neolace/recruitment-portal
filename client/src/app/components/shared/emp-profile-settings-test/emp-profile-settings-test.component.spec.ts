import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpProfileSettingsTestComponent } from './emp-profile-settings-test.component';

describe('EmpProfileSettingsTestComponent', () => {
  let component: EmpProfileSettingsTestComponent;
  let fixture: ComponentFixture<EmpProfileSettingsTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpProfileSettingsTestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpProfileSettingsTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
