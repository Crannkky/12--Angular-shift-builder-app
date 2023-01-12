import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from './login-form/login-form.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { RegisterAdminFormComponent } from './register-admin-form/register-admin-form.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomepageComponent } from './homepage/homepage.component';
import { AddShiftComponent } from './add-shift/add-shift.component';
import { AuthGuard } from './shared/guard/auth.guard';

const routes: Routes = [
  { path: '', component: HomepageComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginFormComponent },
  { path: 'register', component: RegisterFormComponent },
  { path: 'admin/register', component: RegisterAdminFormComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  { path: 'add-shift', component: AddShiftComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],

  exports: [RouterModule],
})
export class AppRoutingModule {}
