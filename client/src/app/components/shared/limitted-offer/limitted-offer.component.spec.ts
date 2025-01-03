import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LimittedOfferComponent } from './limitted-offer.component';

describe('LimittedOfferComponent', () => {
  let component: LimittedOfferComponent;
  let fixture: ComponentFixture<LimittedOfferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LimittedOfferComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LimittedOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
