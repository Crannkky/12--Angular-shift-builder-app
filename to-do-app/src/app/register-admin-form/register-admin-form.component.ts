import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { uuidv4 } from '@firebase/util';
import { AuthService } from '../shared/auth.admin.service';

@Component({
  selector: 'app-register-admin-form',
  templateUrl: './register-admin-form.component.html',
  styleUrls: ['./register-admin-form.component.scss'],
})
export class RegisterAdminFormComponent implements OnInit {
  admin: any = {
    first_name: '',
    last_name: '',
    email_address: '',
    password: '',
    admin_token: '',
  };

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  form: FormGroup;

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: uuidv4(),
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email_address: ['', Validators.required],
      password: ['', Validators.required],
      admin_token: ['', Validators.required],
      is_admin: 'true',
    });
  }

  registerAdmin(form: any) {
    this.authService.registerAdmin(form.value);
    console.log(this.form.value);
    console.log('Admin account created!');
  }

  onSubmit() {
    console.log(this.form), console.log(this.form.value.email_address);
  }

  redirectAdmin() {
    this.router.navigate(['/admin.login']);
  }
}
