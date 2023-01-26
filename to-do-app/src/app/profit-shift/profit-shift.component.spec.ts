import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfitShiftComponent } from './profit-shift.component';

describe('ProfitShiftComponent', () => {
  let component: ProfitShiftComponent;
  let fixture: ComponentFixture<ProfitShiftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfitShiftComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfitShiftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
