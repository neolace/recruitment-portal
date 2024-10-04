import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingAndUsageComponent } from './billing-and-usage.component';

describe('BillingAndUsageComponent', () => {
  let component: BillingAndUsageComponent;
  let fixture: ComponentFixture<BillingAndUsageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillingAndUsageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillingAndUsageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
