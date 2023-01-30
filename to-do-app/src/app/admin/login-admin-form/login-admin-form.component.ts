import { Component, OnInit } from '@angular/core';
import { AuthAdminService } from 'src/app/shared/auth.admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-admin-form',
  templateUrl: './login-admin-form.component.html',
  styleUrls: ['./login-admin-form.component.scss'],
})
export class LoginAdminFormComponent implements OnInit {
  constructor(
    public authAdminService: AuthAdminService,
    public router: Router
  ) {}

  ngOnInit(): void {}

  redirectLogin() {
    this.router.navigate(['admin/register']);
  }

  redirectForgotPass() {
    this.router.navigate(['/forgot-password']);
  }
}
