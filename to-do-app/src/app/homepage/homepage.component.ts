import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { EditModalService } from '../shared/edit-modal.service';

@Component({
  selector: 'app-homepage',

  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {
  shifts;

  constructor(
    db: AngularFirestore,
    private editModalService: EditModalService
  ) {
    const loggedUser = JSON.parse(window.localStorage.getItem('user'));
    db.collection('shifts', (ref) =>
      ref.where('createdBy', '==', loggedUser.email)
    )
      .valueChanges()
      .subscribe((data) => {
        if (data.length > 0) {
          this.shifts = data;
          console.log(data);
        } else {
          console.log('No data found');
          console.log(loggedUser);
        }
      });
  }

  open() {
    console.log('Modal opened!');
    this.editModalService.open();
  }

  ngOnInit(): void {}
}
