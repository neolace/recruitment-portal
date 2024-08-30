import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProMainDbComponent } from './pro-main-db.component';

describe('ProMainDbComponent', () => {
  let component: ProMainDbComponent;
  let fixture: ComponentFixture<ProMainDbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProMainDbComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProMainDbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
