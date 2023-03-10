import { Component, OnInit, Input, OnChanges } from '@angular/core';

import { Observable } from 'rxjs';

import { EditModalService } from '../shared/edit-modal.service';

import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Shift } from '../shared/shift.interface';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss'],
})
export class EditModalComponent implements OnInit, OnChanges {
  form: FormGroup;
  display$: Observable<'open' | 'close'>;
  @Input() expectedProp: Shift;

  constructor(
    private editModalService: EditModalService,
    private db: AngularFirestore,
    private formBuilder: FormBuilder
  ) {}

  //Date.parse('2023-03-12 12:30') (/1000 *60 *60)

  ngOnInit(): void {
    const loggedUser = JSON.parse(window.localStorage.getItem('user'));
    this.display$ = this.editModalService.watch();

    this.form = this.formBuilder.group({
      date: [''],
      startTime: [''],
      endTime: [''],
      totalHours: [''],
      hourlyWage: [''],
      workPlace: [''],
      shiftName: [''],
      comments: [''],
      totalProfit: [''],
    });
  }

  ngOnChanges() {
    this.form.patchValue(this.expectedProp);
  }

  close() {
    this.editModalService.close();
  }
}
