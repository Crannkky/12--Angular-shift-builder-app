import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { NotifierService } from 'angular-notifier';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  form: FormGroup;
  private readonly notifier: NotifierService;

  constructor(
    private formBuilder: FormBuilder,
    private afAuth: AngularFireAuth,
    notifierService: NotifierService,
    public router: Router
  ) {
    this.notifier = notifierService;
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      userEmail: [''],
    });
  }

  findUser() {
    this.afAuth
      .sendPasswordResetEmail(this.form.value.userEmail)
      .then(() => {
        this.notifier.notify(
          'success',
          'Password reset email was sent! Please check your inbox.'
        );
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        console.log(error.message);
        this.notifier.notify(
          'error',
          'An account does not exist with the provided email address!'
        );
      });
  }
}
// console.log(this.form.value);
// this.db
//   .collection('users', (ref) =>
//     ref.where('email', '==', this.form.value.userEmail)
//   )
//   .valueChanges()
//   .subscribe((data) => {
//     if (data.length > 0) {
//       this.userData = data[0];
//       console.log(this.userData);
//     } else {
//       this.notifier.notify(
//         'error',
//         'There is no account with this address!'
//       );
//     }
//   });
