import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-past-week-shifts',
  templateUrl: './past-week-shifts.component.html',
  styleUrls: ['./past-week-shifts.component.scss'],
  providers: [DatePipe],
})
export class PastWeekShiftsComponent implements OnInit {
  filteredShift = [];
  @Input() expectedProp;
  constructor() {}

  ngOnInit(): void {
    this.pastWeekShifts();
  }

  ngOnChanges() {
    this.pastWeekShifts();
  }

  pastWeekShifts() {
    const shifts = this.expectedProp;
    const currentDate = new Date();
    const prevWeekStart = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() - currentDate.getUTCDay() - 7
    );
    const prevWeekEnd = new Date(
      prevWeekStart.getFullYear(),
      prevWeekStart.getMonth(),
      prevWeekStart.getDate() + 6
    );
    this.filteredShift = shifts.filter((shift) => {
      const shiftDate = new Date(shift.startDate.seconds * 1000);
      return shiftDate >= prevWeekStart && shiftDate <= prevWeekEnd;
    });
    console.log('Filteredshifts', this.filteredShift);
  }

  parseDate(date) {
    if (typeof date === 'string') {
      return new Date(date);
    }
    return date.toDate();
  }
}
