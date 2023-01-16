import { Component, OnInit, Input } from '@angular/core';

import { Observable } from 'rxjs';

import { EditModalService } from '../shared/edit-modal.service';

import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss'],
})
export class EditModalComponent implements OnInit {
  form: FormGroup;
  display$: Observable<'open' | 'close'>;
  @Input() expectedProp: { shifts };

  constructor(
    private editModalService: EditModalService,
    private db: AngularFirestore,
    private formBuilder: FormBuilder
  ) {}

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
    });
  }

  close() {
    this.editModalService.close();
  }
}
