import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewerTypesPieChartComponent } from './viewer-types-pie-chart.component';

describe('ViewerTypesPieChartComponent', () => {
  let component: ViewerTypesPieChartComponent;
  let fixture: ComponentFixture<ViewerTypesPieChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewerTypesPieChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewerTypesPieChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
