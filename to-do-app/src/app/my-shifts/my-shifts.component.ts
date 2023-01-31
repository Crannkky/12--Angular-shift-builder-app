import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { EditModalService } from '../shared/edit-modal.service';
import { Shift } from '../shared/shift.interface';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-my-shifts',
  templateUrl: './my-shifts.component.html',
  styleUrls: ['./my-shifts.component.scss'],
})
export class MyShiftsComponent implements OnInit {
  filterTerm: string;
  shifts: Array<Shift>;
  selectedIndex;
  roundedProfit: number;
  filteredShifts: Array<Shift>;
  private readonly notifier: NotifierService;

  constructor(
    private db: AngularFirestore,
    private editModalService: EditModalService,
    notifierService: NotifierService
  ) {
    this.notifier = notifierService;

    const loggedUser = JSON.parse(window.localStorage.getItem('user'));
    db.collection<Shift>('shifts', (ref) =>
      ref.where('createdBy', '==', loggedUser.email)
    )
      .valueChanges()
      .subscribe((data) => {
        if (data.length > 0) {
          this.shifts = data;
          this.filteredShifts = data;
          console.log(data);
        } else {
          console.log('No data found');
          console.log(loggedUser);
        }
      });
  }

  parseDate(date) {
    if (typeof date === 'string') {
      return new Date(date);
    }
    return date.toDate();
  }

  deleteDocument(formId: string) {
    this.db
      .collection('shifts', (ref) => ref.where('id', '==', formId))
      .get()
      .subscribe((snapshot) => {
        snapshot.forEach((doc) => {
          console.log('Delete', doc.data());
          doc.ref.delete();
        });
      });
    this.notifier.notify('error', 'Shift was deleted');
  }

  open(i) {
    this.selectedIndex = i;
    console.log('Modal opened!');
    this.editModalService.open();
  }

  ngOnInit(): void {}
}
