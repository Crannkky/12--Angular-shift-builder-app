import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from './login-form/login-form.component';
import { LoginAdminFormComponent } from './admin/login-admin-form/login-admin-form.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { RegisterAdminFormComponent } from './admin/register-admin-form/register-admin-form.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomepageComponent } from './homepage/homepage.component';
import { AddShiftComponent } from './add-shift/add-shift.component';
import { AuthGuard } from './shared/guard/auth.guard';
import { MyShiftsComponent } from './my-shifts/my-shifts.component';

const routes: Routes = [
  {
    path: '',
    component: HomepageComponent,
    canActivate: [AuthGuard],
  },
  { path: 'login', component: LoginFormComponent },
  { path: 'register', component: RegisterFormComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  { path: 'add-shift', component: AddShiftComponent, canActivate: [AuthGuard] },
  {
    path: 'admin/register',
    component: RegisterAdminFormComponent,
  },
  {
    path: 'admin/login',
    component: LoginAdminFormComponent,
  },
  {
    path: 'my-shifts',
    component: MyShiftsComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],

  exports: [RouterModule],
})
export class AppRoutingModule {}
