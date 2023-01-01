import { Injectable, NgZone } from '@angular/core';
import { User } from './user';
import * as auth from 'firebase/auth';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any;
  firestoreCollection: AngularFirestoreCollection;

  constructor(
    private firestore: AngularFirestore,
    private angularFireAuth: AngularFireAuth,
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone
  ) {
    this.firestoreCollection = firestore.collection('users');
    this.userData = angularFireAuth.authState;
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }

  LogIn(email_address: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email_address, password)
      .then((result) => {
        this.SetUserData(result.user);
        this.afAuth.authState.subscribe((user) => {
          if (user) {
            this.router.navigate(['/']);
          }
        });
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  Register(email_address: string, password: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email_address, password)
      .then((result) => {
        this.SendVerificationEmail();
        this.SetUserData(result.user);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  SendVerificationEmail() {
    return this.afAuth.currentUser
      .then((u: any) => u.sendVerificationMail())
      .then(() => {
        this.router.navigate(['verify-email-address']);
      });
  }

  ForgotPassword(passwordResetEmail: string) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email was sent, check your inbox.');
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null && user.emailVerified != false ? true : false;
  }

  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider()).then((res: any) => {
      this.router.navigate(['/']);
    });
  }

  // Function that runs the auth logic providers

  AuthLogin(provider: any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        this.router.navigate(['/']);
        this.SetUserData(result.user);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // Function that sets the user data when a user logs-in using email/password or social-auth in Firebase

  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.id}`
    );
    const userData: User = {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email_address: user.email_address,
      password: user.password,
    };
    return (
      userRef.set(userData),
      {
        merge: true,
      }
    );
  }

  // Log-out function that removes the user details from localstorage which we use so that we can idnetify logged in users

  LogOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['/login']);
    });
  }

  ///////////////

  registerUser(user: any) {
    this.firestoreCollection.add({
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email_address: user.email_address,
      password: user.password,
    });
  }

  updateUser(user: any) {
    this.firestoreCollection
      .doc(user.id)
      .update({ password: user.password, email_address: user.email_address });
  }

  deleteUser(user: any) {
    this.firestoreCollection.doc(user.id).delete();
  }
}
