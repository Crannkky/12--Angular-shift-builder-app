import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  item;
  user;
  form: FormGroup;
  constructor(
    public authService: AuthService,
    private db: AngularFirestore,
    private formBuilder: FormBuilder
  ) {
    const loggedUser = JSON.parse(window.localStorage.getItem('user'));
    db.collection('users', (ref) => ref.where('email', '==', loggedUser.email))
      .valueChanges()
      .subscribe((data) => {
        if (data.length > 0) {
          this.item = data[0];
          console.log(data);
          console.log(loggedUser);
        } else {
          console.log('No data found');
          console.log(loggedUser);
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
    alert('Password was updated successfully');
  }
}
