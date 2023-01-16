import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { uuidv4 } from '@firebase/util';
import { Router } from '@angular/router';
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
    public authService: AuthService,
    public router: Router
  ) {}

  ngOnInit(): void {
    const loggedUser = JSON.parse(window.localStorage.getItem('user'));
    this.form = this.formBuilder.group({
      id: [uuidv4()],
      date: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      totalHours: ['', Validators.required],
      hourlyWage: ['', Validators.required],
      workPlace: ['', Validators.required],
      shiftName: ['', Validators.required],
      comments: ['', Validators.required],
      createdBy: [loggedUser.email],
    });
  }

  addShift(form: any) {
    const loggedUser = JSON.parse(window.localStorage.getItem('user'));
    this.authService.addShift(form.value, loggedUser.email);
    alert('Shift added successfully!');
    console.log(this.form.value);
    this.router.navigate(['/']);
  }
}
