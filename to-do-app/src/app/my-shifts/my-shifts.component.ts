import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { EditModalService } from '../shared/edit-modal.service';
import { Shift } from '../shared/shift.interface';
import { NotifierService } from 'angular-notifier';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

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
  sortedShifts: any;
  form: FormGroup;
  showSortedTable: boolean = false;
  private readonly notifier: NotifierService;

  constructor(
    private db: AngularFirestore,
    private editModalService: EditModalService,
    notifierService: NotifierService,
    private formBuilder: FormBuilder,
    public router: Router
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
          this.notifier.notify('error', 'Shift was deleted');
          doc.ref.delete();
        });
      });
  }

  open(i) {
    this.selectedIndex = i;
    this.editModalService.open();
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      startDate: [''],
      endDate: [''],
      location: [''],
    });

    this.sortedShifts = this.shifts;
    console.log('OnInit', this.sortedShifts);
  }

  filterShifts() {
    console.log(this.form.value);
    console.log(
      'Start Date - Sort',
      new Date(this.form.value.startDate).getTime() / 1000
    );
    console.log(
      'End Date - sort',
      new Date(this.form.value.endDate).getTime() / 1000
    );
    this.sortedShifts = this.filteredShifts = this.shifts.filter(
      (shift) =>
        shift.startDate.seconds >=
          new Date(this.form.value.startDate).getTime() / 1000 &&
        shift.endDate.seconds <=
          new Date(this.form.value.endDate).getTime() / 1000
    );
    this.showSortedTable = true;
    console.log('sorted shifts', this.sortedShifts);
    this.form.reset();
    return this.sortedShifts;
  }
}
