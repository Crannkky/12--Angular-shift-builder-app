import { Injectable, NgZone } from '@angular/core';
import { Shift } from './shift.interface';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { uuidv4 } from '@firebase/util';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ShiftsService {
  userData: any;
  firestoreCollectionShifts: AngularFirestoreCollection;

  constructor(
    private firestore: AngularFirestore,
    private angularFireAuth: AngularFireAuth,
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone,
    private datepipe: DatePipe
  ) {
    this.firestoreCollectionShifts = firestore.collection('shifts');
  }

  addShift(shift: Shift, creator: string) {
    console.log('Start Date', shift.startDate);
    console.log('End Date', shift.endDate);
    const startDate = this.datepipe.transform(
      shift.startDate,
      'yyy-MM-ddTHH:mm'
    );
    const startMili = Date.parse(startDate);
    const endDate = this.datepipe.transform(shift.endDate, 'yyy-MM-ddTHH:mm');
    const endMili = Date.parse(endDate);
    const totalHours = ((endMili - startMili) / (1000 * 60 * 60)).toFixed(1);

    this.firestoreCollectionShifts.add({
      id: uuidv4(),
      startDate: new Date(shift.startDate),
      endDate: new Date(shift.endDate),
      totalHours: totalHours,
      hourlyWage: shift.hourlyWage,
      workPlace: shift.workPlace,
      shiftName: shift.shiftName,
      comments: shift.comments,
      createdBy: creator,
      totalProfit: Math.round(Number(totalHours) * shift.hourlyWage).toFixed(2),
    });
  }
}
