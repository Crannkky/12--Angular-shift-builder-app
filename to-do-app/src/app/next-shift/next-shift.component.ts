import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { DatePipe } from '@angular/common';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Shift } from '../shared/shift.interface';

@Component({
  selector: 'app-next-shift',
  templateUrl: './next-shift.component.html',
  styleUrls: ['./next-shift.component.scss'],
  providers: [DatePipe],
})
export class NextShiftComponent implements OnInit, OnDestroy, OnChanges {
  currentDate = new Date();
  intervalId;
  startDates = [];
  endDates = [];
  parsedStartDates = [];
  parsedEndDates = [];
  previousShift: number;
  nextShift: number;
  @Input() expectedProp;

  constructor(private datePipe: DatePipe, db: AngularFirestore) {}

  parseDate(date) {
    if (typeof date === 'string') {
      return new Date(date);
    }
    return date.toDate();
  }

  ngOnInit() {
    this.intervalId = setInterval(() => {
      this.currentDate = new Date();
    }, 1000);
    console.log(this.expectedProp);
    this.setShiftsTimeline();
  }

  ngOnChanges() {
    this.setShiftsTimeline();
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

  setShiftsTimeline() {
    const shifts = this.expectedProp;

    this.startDates = shifts
      .map((shift) => shift.startDate)
      .sort((a, b) => a - b);

    const previousStartDate = this.startDates
      .filter((date) => this.parseDate(date) < this.currentDate)
      .pop();

    const nextStartDate = this.startDates.find(
      (date) => this.parseDate(date) > this.currentDate
    );

    this.previousShift = previousStartDate;

    this.nextShift = nextStartDate;
  }
}
