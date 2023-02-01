import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  item;
  user;
  form: FormGroup;
  private readonly notifier: NotifierService;

  constructor(
    public authService: AuthService,
    private db: AngularFirestore,
    private formBuilder: FormBuilder,
    notifierService: NotifierService,
    public router: Router
  ) {
    this.notifier = notifierService;

    const loggedUser = JSON.parse(window.localStorage.getItem('user'));
    db.collection('users', (ref) => ref.where('email', '==', loggedUser.email))
      .valueChanges()
      .subscribe((data) => {
        if (data.length > 0) {
          this.item = data[0];
        } else {
          console.log('No data found');
        }
      });
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      password: [''],
    });
  }

  updateUserDb(form: any) {
    const loggedUser = JSON.parse(window.localStorage.getItem('user'));
    this.authService.updateUser(form.value, loggedUser.uid);
    this.db
      .collection('users', (ref) => ref.where('email', '==', loggedUser.email))
      .get()
      .toPromise()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref.update({ password: form.value.password });
        });
      });
    this.notifier.notify('success', 'Password was updated successfully');
    this.router.navigate(['/']);
  }
}
