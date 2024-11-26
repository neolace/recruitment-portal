import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityTrendsComponent } from './activity-trends.component';

describe('ActivityTrendsComponent', () => {
  let component: ActivityTrendsComponent;
  let fixture: ComponentFixture<ActivityTrendsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivityTrendsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivityTrendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
