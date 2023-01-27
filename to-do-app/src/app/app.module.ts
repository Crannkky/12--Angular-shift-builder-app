import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from '../environments/environment';
import { RegisterAdminFormComponent } from './register-admin-form/register-admin-form.component';
import { LoginAdminFormComponent } from './login-admin-form/login-admin-form.component';
import { AuthService } from './shared/auth.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HomepageComponent } from './homepage/homepage.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AddShiftComponent } from './add-shift/add-shift.component';
import { EditModalComponent } from './edit-modal/edit-modal.component';
import { DatePipe } from '@angular/common';
import { NextShiftComponent } from './next-shift/next-shift.component';
import { NotifierModule } from 'angular-notifier';
import { ProfitShiftComponent } from './profit-shift/profit-shift.component';
import { MyShiftsComponent } from './my-shifts/my-shifts.component';
import { PastWeekShiftsComponent } from './past-week-shifts/past-week-shifts.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    RegisterFormComponent,
    RegisterAdminFormComponent,
    LoginAdminFormComponent,
    DashboardComponent,
    HomepageComponent,
    NavbarComponent,
    AddShiftComponent,
    EditModalComponent,
    NextShiftComponent,
    ProfitShiftComponent,
    MyShiftsComponent,
    PastWeekShiftsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(
      environment.firebaseConfig,
      'fullstack-shift-builder'
    ),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    FontAwesomeModule,
    NotifierModule,
  ],
  providers: [AuthService, DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
