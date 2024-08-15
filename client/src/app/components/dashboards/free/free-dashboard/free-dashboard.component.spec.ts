import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreeDashboardComponent } from './free-dashboard.component';

describe('FreeDashboardComponent', () => {
  let component: FreeDashboardComponent;
  let fixture: ComponentFixture<FreeDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FreeDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FreeDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
