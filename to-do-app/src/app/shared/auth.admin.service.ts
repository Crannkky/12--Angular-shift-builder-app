import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  firestoreCollection: AngularFirestoreCollection;

  constructor(private firestore: AngularFirestore) {
    this.firestoreCollection = firestore.collection('admins');
  }

  registerAdmin(admin: any) {
    this.firestoreCollection.add({
      id: admin.id,
      first_name: admin.first_name,
      last_name: admin.last_name,
      email_address: admin.email_address,
      password: admin.password,
      admin_token: admin.admin_token,
      is_admin: admin.is_admin,
    });
  }

  updateAdmin(admin: any) {
    this.firestoreCollection
      .doc(admin.id)
      .update({ password: admin.password, email_address: admin.email_address });
  }

  deleteAdmin(admin: any) {
    this.firestoreCollection.doc(admin.id).delete();
  }
}
