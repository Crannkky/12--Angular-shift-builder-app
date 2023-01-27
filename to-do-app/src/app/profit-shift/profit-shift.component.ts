import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { Shift } from '../shared/shift.interface';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-profit-shift',
  templateUrl: './profit-shift.component.html',
  styleUrls: ['./profit-shift.component.scss'],
})
export class ProfitShiftComponent implements OnInit, OnChanges {
  @Input() expectedProp;
  profitShift: number;
  theShift: Shift;
  bestMonth: {
    month: number;
    monthName?: string;
    totalProfit: number;
  };

  constructor(private datePipe: DatePipe) {}

  ngOnInit(): void {
    this.mostProfitableMonth;
    this.monthName();
  }

  ngOnChanges(): void {
    this.mostProfitableMonth();
    this.monthName();
    console.log(this.theShift);
  }

  parseDate(date) {
    if (typeof date === 'string') {
      return new Date(date);
    }
    return date.toDate();
  }

  mostProfitableMonth() {
    const shifts = this.expectedProp;
    console.log('Shifts: ', shifts);
    const monthProfit: {
      [month: number]: { month: number; totalProfit: number };
    } = shifts.reduce((acc: Shift, shift: Shift) => {
      let startDate = new Date(shift.startDate.seconds * 1000);
      const month = startDate.getUTCMonth();
      if (!acc[month]) {
        acc[month] = { month, totalProfit: 0 };
      }
      acc[month].totalProfit += parseInt(shift.totalProfit);
      return acc;
    }, {});
    this.bestMonth = Object.values(monthProfit).reduce((a, b) => {
      return a.totalProfit > b.totalProfit ? a : b;
    });
  }

  monthName() {
    const date = new Date();
    date.setMonth(this.bestMonth.month);
    this.bestMonth.monthName = this.datePipe.transform(date, 'MMM');
  }
}
