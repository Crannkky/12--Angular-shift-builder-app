import { Component, OnInit, OnChanges } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { uuidv4 } from '@firebase/util';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { DatePipe } from '@angular/common';
import { ShiftsService } from '../shared/shifts.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-add-shift',
  templateUrl: './add-shift.component.html',
  styleUrls: ['./add-shift.component.scss'],
})
export class AddShiftComponent implements OnInit {
  form: FormGroup;
  private readonly notifier: NotifierService;

  constructor(
    private formBuilder: FormBuilder,
    public shiftsService: ShiftsService,
    public router: Router,
    public datepipe: DatePipe,
    notifierService: NotifierService
  ) {
    this.notifier = notifierService;
  }

  ngOnInit(): void {
    const loggedUser = JSON.parse(window.localStorage.getItem('user'));
    this.form = this.formBuilder.group({
      id: [uuidv4()],
      startDate: [Date, Validators.required],
      endDate: [Date, Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      hourlyWage: ['', Validators.required],
      workPlace: ['', Validators.required],
      shiftName: ['', Validators.required],
      comments: ['', Validators.required],
      createdBy: [loggedUser.email],
    });
  }

  addShift(form: any) {
    const loggedUser = JSON.parse(window.localStorage.getItem('user'));
    this.shiftsService.addShift(form.value, loggedUser.email);
    this.notifier.notify('success', 'Shift added successfully!');
    this.router.navigate(['/']);
  }
}
