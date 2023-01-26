import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { uuidv4 } from '@firebase/util';
import { AuthAdminService } from '../shared/auth.admin.service';

@Component({
  selector: 'app-register-admin-form',
  templateUrl: './register-admin-form.component.html',
  styleUrls: ['./register-admin-form.component.scss'],
})
export class RegisterAdminFormComponent implements OnInit {
  form: FormGroup;

  admin = {
    id: uuidv4(),
    email: '',
    firstName: '',
    lastName: '',
    age: '',
    password: '',
    adminToken: '',
    isAdmin: true,
  };

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    public authAdminService: AuthAdminService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: uuidv4(),
      email: ['', [Validators.required]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      age: ['', Validators.required],
      password: ['', Validators.required],
      adminToken: ['', Validators.required],
      isAdmin: [true],
    });
  }

  registerUserDb(form: any) {
    this.authAdminService.registerAdmin(form.value);
    console.log(this.form.value);
    console.log('Data registration successful');
  }

  redirectAdmin() {
    this.router.navigate(['/admin/login']);
  }
}
