import { Injectable, NgZone } from '@angular/core';
import { UserAuth } from './user';
import * as auth from 'firebase/auth';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthAdminService {
  adminData: any;
  firestoreCollection: AngularFirestoreCollection;

  constructor(
    public firestore: AngularFirestore,
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
    private router: Router,
    private ngZone: NgZone
  ) {
    this.firestoreCollection = firestore.collection('admins');
    this.adminData = afAuth.authState;
    this.afAuth.authState.subscribe((admin) => {
      if (admin) {
        this.adminData = admin;
        localStorage.setItem('admin', JSON.stringify(this.adminData));
        JSON.parse(localStorage.getItem('admin'));
      } else {
        localStorage.setItem('admin', 'null');
        JSON.parse(localStorage.getItem('admin'));
      }
    });
  }

  RegisterAdmin(email: string, password: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.SetAdminData(result.user);
        this.router.navigate(['/admin/login']);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  LogInAdmin(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.SetAdminData(result.user);
        this.afAuth.authState.subscribe((user) => {
          if (user) {
            this.router.navigate(['/admin/homepage']);
          }
        });
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  SetAdminData(admin: any) {
    const adminRef: AngularFirestoreDocument<any> = this.afs.doc(
      'adminAuth/${admin.id'
    );
    const adminData = {
      uid: admin.uid,
      email: admin.email,
      displayName: admin.displayName,
      photoUrl: admin.photoUrl,
      emailVerified: admin.emailVerified,
    };
    return adminRef.set(adminData, { merge: true });
  }

  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider()).then((res: any) => {
      this.router.navigate(['/admin/homepage']);
    });
  }

  AuthLogin(provider: any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((results) => {
        this.router.navigate(['/admin/homepage']);
        this.SetAdminData(results.user);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  registerAdmin(admin: any) {
    this.firestoreCollection.add({
      id: admin.id,
      firstName: admin.firstName,
      lastName: admin.lastName,
      email: admin.email,
      password: admin.password,
      adminToken: admin.adminToken,
      is_admin: true,
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

  redirectAdminLogin() {
    this.router.navigate(['/admin/register']);
  }

  redirectAdminRegister() {
    this.router.navigate(['/admin/login']);
  }
}
