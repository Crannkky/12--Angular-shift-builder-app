import { Component, OnInit, Input, OnChanges } from '@angular/core';

import { Observable, subscribeOn } from 'rxjs';

import { EditModalService } from '../shared/edit-modal.service';

import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Shift } from '../shared/shift.interface';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss'],
})
export class EditModalComponent implements OnInit, OnChanges {
  form: FormGroup;
  display$: Observable<'open' | 'close'>;
  @Input() expectedProp: Shift;
  private readonly notifier: NotifierService;

  constructor(
    private editModalService: EditModalService,
    private db: AngularFirestore,
    private formBuilder: FormBuilder,
    notifierService: NotifierService
  ) {
    this.notifier = notifierService;
  }

  ngOnInit(): void {
    const loggedUser = JSON.parse(window.localStorage.getItem('user'));
    this.display$ = this.editModalService.watch();

    this.form = this.formBuilder.group({
      startDate: [''],
      endDate: [''],
      hourlyWage: [''],
      totalHours: [''],
      workPlace: [''],
      shiftName: [''],
      comments: [''],
      totalProfit: [''],
    });
  }

  ngOnChanges() {
    console.log(this.expectedProp);
    this.form.patchValue(this.expectedProp);
    this.form.value.totalHours = this.expectedProp.totalHours;
    console.log(this.form.value.totalHours);
    this.form.value.totalProfit = Math.round(
      this.form.value.hourlyWage * this.expectedProp.totalHours
    ).toFixed(2);
    console.log(this.form.value.totalProfit);
  }

  updateShift() {
    const data = this.form.value;
    const shiftData = this.expectedProp;
    this.db
      .collection('shifts', (ref) => ref.where('id', '==', shiftData.id))
      .get()
      .subscribe((snapshot) => {
        snapshot.forEach((doc) => {
          console.log(doc.data());
          doc.ref.update(data);
        });
      });
    this.notifier.notify('success', 'Shift succesfully updated');
    this.close();
  }

  close() {
    this.editModalService.close();
  }
}
