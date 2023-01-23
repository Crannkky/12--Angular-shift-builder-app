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

@Component({
  selector: 'app-add-shift',
  templateUrl: './add-shift.component.html',
  styleUrls: ['./add-shift.component.scss'],
})
export class AddShiftComponent implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public shiftsService: ShiftsService,
    public router: Router,
    public datepipe: DatePipe
  ) {}

  ngOnInit(): void {
    const loggedUser = JSON.parse(window.localStorage.getItem('user'));
    this.form = this.formBuilder.group({
      id: [uuidv4()],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
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
    alert('Shift added successfully!');
    console.log(this.form.value);
    this.router.navigate(['/']);
  }
}
