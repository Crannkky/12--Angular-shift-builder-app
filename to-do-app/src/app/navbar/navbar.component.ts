import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import {
  faPersonThroughWindow,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  faPersonThroughWindow = faPersonThroughWindow;
  faPlus = faPlus;
  item;

  constructor(public authService: AuthService, db: AngularFirestore) {
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

  ngOnInit(): void {}
}
