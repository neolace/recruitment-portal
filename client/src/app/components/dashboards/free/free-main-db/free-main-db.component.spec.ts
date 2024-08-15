import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreeMainDbComponent } from './free-main-db.component';

describe('FreeMainDbComponent', () => {
  let component: FreeMainDbComponent;
  let fixture: ComponentFixture<FreeMainDbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FreeMainDbComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FreeMainDbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
