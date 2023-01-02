import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { uuidv4 } from '@firebase/util';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
})
export class RegisterFormComponent implements OnInit {
  user: any = {
    uid: '',
    displayName: '',
    email: '',
    password: '',
  };

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    public authService: AuthService
  ) {}

  form: FormGroup;

  ngOnInit(): void {
    //   this.form = this.formBuilder.group({
    //     uid: uuidv4(),
    //     first_name: ['', Validators.required],
    //     last_name: ['', Validators.required],
    //     email: ['', Validators.required],
    //     password: ['', Validators.required],
    //   });
    // }
    // registerUser(form: any) {
    //   this.authService.registerUser(form.value);
    //   console.log(this.form.value);
    //   console.log('Data registered successfully');
    // }
    // onSubmit() {
    //   console.log(this.form);
    //   console.log(this.form.value.email_address);
    // }
    // redirectLogin() {
    //   this.router.navigate(['/login']);
  }
}
