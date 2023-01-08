import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';
import { faHandHoldingHand } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  faHandHoldingHand = faHandHoldingHand;

  constructor(public authService: AuthService, public router: Router) {}

  ngOnInit(): void {}

  redirectLogin() {
    this.router.navigate(['/register']);
  }

  redirectForgotPass() {
    this.router.navigate(['/forgot-password']);
  }
}
