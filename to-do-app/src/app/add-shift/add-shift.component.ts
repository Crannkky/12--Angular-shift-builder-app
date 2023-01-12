import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';

import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-add-shift',
  templateUrl: './add-shift.component.html',
  styleUrls: ['./add-shift.component.scss'],
})
export class AddShiftComponent implements OnInit {
  form: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    const loggedUser = JSON.parse(window.localStorage.getItem('user'));
    this.form = this.formBuilder.group({
      date: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      hourlyWage: ['', Validators.required],
      workPlace: ['', Validators.required],
      shiftName: ['', Validators.required],
      comments: ['', Validators.required],
      createdBy: [loggedUser.email],
    });
    console.log(loggedUser.email);
  }

  addShift(form: any) {
    const loggedUser = JSON.parse(window.localStorage.getItem('user'));
    this.authService.addShift(form.value, loggedUser.email);
    alert('Shift added successfully!');
    console.log(this.form.value);
  }
}
