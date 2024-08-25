import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrisingComponent } from './prising.component';

describe('PrisingComponent', () => {
  let component: PrisingComponent;
  let fixture: ComponentFixture<PrisingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrisingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrisingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
