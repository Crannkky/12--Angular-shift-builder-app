import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterShiftsComponent } from './filter-shifts.component';

describe('FilterShiftsComponent', () => {
  let component: FilterShiftsComponent;
  let fixture: ComponentFixture<FilterShiftsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterShiftsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterShiftsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
