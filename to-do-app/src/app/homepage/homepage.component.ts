import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { EditModalService } from '../shared/edit-modal.service';
import { Shift } from '../shared/shift.interface';

@Component({
  selector: 'app-homepage',

  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {
  shifts: Array<Shift>;
  selectedIndex;

  constructor(
    db: AngularFirestore,
    private editModalService: EditModalService
  ) {
    const loggedUser = JSON.parse(window.localStorage.getItem('user'));
    db.collection<Shift>('shifts', (ref) =>
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

  open(i) {
    this.selectedIndex = i;
    console.log('Modal opened!');
    this.editModalService.open();
  }

  ngOnInit(): void {}
}
