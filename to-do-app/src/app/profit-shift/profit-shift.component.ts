import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { Shift } from '../shared/shift.interface';

@Component({
  selector: 'app-profit-shift',
  templateUrl: './profit-shift.component.html',
  styleUrls: ['./profit-shift.component.scss'],
})
export class ProfitShiftComponent implements OnInit, OnChanges {
  @Input() expectedProp;
  profitShift: number;
  theShift: Shift;

  constructor() {}

  ngOnInit(): void {
    this.mostProfitableShift();
  }

  ngOnChanges(): void {
    this.mostProfitableShift();
    console.log(this.theShift);
  }

  parseDate(date) {
    if (typeof date === 'string') {
      return new Date(date);
    }
    return date.toDate();
  }

  mostProfitableShift() {
    const shifts = this.expectedProp;
    console.log('Shifts: ', shifts);
    this.profitShift = Math.max(...shifts.map((shift) => shift.totalProfit));
    console.log(this.profitShift);
    this.theShift = shifts.find((shift) => {
      return shift.totalProfit == this.profitShift;
    });
    console.log(this.theShift);
  }
}
