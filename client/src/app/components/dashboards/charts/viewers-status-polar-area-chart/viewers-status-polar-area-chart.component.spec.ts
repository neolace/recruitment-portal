import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewersStatusPolarAreaChartComponent } from './viewers-status-polar-area-chart.component';

describe('ViewersStatusPolarAreaChartComponent', () => {
  let component: ViewersStatusPolarAreaChartComponent;
  let fixture: ComponentFixture<ViewersStatusPolarAreaChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewersStatusPolarAreaChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewersStatusPolarAreaChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
