import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
})
export class RegisterFormComponent implements OnInit {
  constructor(private formBuilder: FormBuilder, private router: Router) {}

  form: FormGroup;

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email_address: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    console.log(this.form);
    console.log(this.form.value.email_address);
    console.log('Data registered successfully');
    this.router.navigate(['/login']);
  }

  redirectLogin() {
    this.router.navigate(['/login']);
  }
}
