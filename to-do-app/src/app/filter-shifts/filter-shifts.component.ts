import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-filter-shifts',
  templateUrl: './filter-shifts.component.html',
  styleUrls: ['./filter-shifts.component.scss'],
})
export class FilterShiftsComponent implements OnInit {
  @Output() filteredData = new EventEmitter<Shift[]>();
  @Input() shiftsInput: Shift[];
  filterTerm: string;

  constructor() {}

  ngOnInit(): void {}

  filterData() {
    const filteredShifts = this.shiftsInput.filter((shift) =>
      shift.position.includes(this.filterTerm)
    );
    this.filteredShiftsOutput.emit(filteredShifts);
  }
}
