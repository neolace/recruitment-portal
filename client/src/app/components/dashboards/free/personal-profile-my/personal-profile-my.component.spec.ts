import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalProfileMyComponent } from './personal-profile-my.component';

describe('PersonalProfileMyComponent', () => {
  let component: PersonalProfileMyComponent;
  let fixture: ComponentFixture<PersonalProfileMyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalProfileMyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonalProfileMyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
