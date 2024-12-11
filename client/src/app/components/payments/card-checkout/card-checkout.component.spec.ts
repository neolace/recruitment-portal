import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardCheckoutComponent } from './card-checkout.component';

describe('CardCheckoutComponent', () => {
  let component: CardCheckoutComponent;
  let fixture: ComponentFixture<CardCheckoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardCheckoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardCheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
