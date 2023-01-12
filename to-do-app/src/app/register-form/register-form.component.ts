import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { faAddressCard } from '@fortawesome/free-solid-svg-icons';
import { faG } from '@fortawesome/free-solid-svg-icons';
import { uuidv4 } from '@firebase/util';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
})
export class RegisterFormComponent implements OnInit {
  faAddressCard = faAddressCard;
  faG = faG;
  form: FormGroup;

  user = {
    id: uuidv4(),
    email: '',
    firstName: '',
    lastName: '',
    age: '',
    password: '',
    isAdmin: false,
  };

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: uuidv4(),
      email: ['', [Validators.required]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      age: ['', Validators.required],
      password: ['', Validators.required],
      isAdmin: [false],
    });
  }

  registerUserDb(form: any) {
    this.authService.registerUser(form.value);
    console.log(this.form.value);
    console.log('Data registration successful');
  }
}
