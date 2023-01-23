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

  ngOnInit() {
    this.intervalId = setInterval(() => {
      this.currentDate = new Date();
    }, 1000);
    console.log(this.expectedProp);
  }

  ngOnChanges() {
    const shifts = this.expectedProp;
    console.log('Shifts', shifts);
    shifts.forEach((shift) => {
      this.startDates.push(Date.parse(shift.startDate));
      console.log(this.startDates);
    });
    const currentTimestamp = Date.parse(this.currentDate.toString());
    const previousStartDate = this.startDates.find(
      (date) => date < currentTimestamp
    );
    const nextStartDate = this.startDates
      .filter((date) => date > currentTimestamp)
      .sort((a, b) => a - b)
      .slice(1, 2)
      .pop();
    this.previousShift = previousStartDate;
    this.nextShift = nextStartDate;
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }
}
