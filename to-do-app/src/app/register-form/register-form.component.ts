import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { faAddressCard } from '@fortawesome/free-solid-svg-icons';
import { faG } from '@fortawesome/free-solid-svg-icons';

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

  faAddressCard = faAddressCard;
  faG = faG;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    public authService: AuthService
  ) {}

  form: FormGroup;

  ngOnInit(): void {}
}
