import { Injectable, NgZone } from '@angular/core';
import { UserAuth } from './user';
import { Shift } from './shift.interface';
import * as auth from 'firebase/auth';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { uuidv4 } from '@firebase/util';
import { DatePipe } from '@angular/common';
import { NotifierService } from 'angular-notifier';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any;
  firestoreCollection: AngularFirestoreCollection;
  firestoreCollectionAuth: AngularFirestoreCollection;
  firestoreCollectionShifts: AngularFirestoreCollection;
  private readonly notifier: NotifierService;

  constructor(
    private firestore: AngularFirestore,
    private angularFireAuth: AngularFireAuth,
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone,
    private datepipe: DatePipe,
    notifierService: NotifierService
  ) {
    this.notifier = notifierService;

    this.firestoreCollection = firestore.collection('users');
    this.firestoreCollectionAuth = firestore.collection('usersAuth');
    this.firestoreCollectionShifts = firestore.collection('shifts');
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

  LogIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.SetUserData(result.user);
        this.afAuth.authState.subscribe((user) => {
          if (user) {
            this.router.navigate(['/']);
          }
        });
      })
      .catch((error) => {
        this.notifier.notify(
          'warning',
          'Incorect credentials or account does not exist'
        );
        console.log(error.message);
      });
  }

  Register(email: string, password: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.SendVerificationEmail();
        this.SetUserData(result.user);
        this.router.navigate(['/login']);
        console.log(result.user);
      })
      .catch((error) => {
        this.notifier.notify('error', error.message);
        console.log(error.message);
      });
  }

  SendVerificationEmail() {
    return this.afAuth.currentUser
      .then((u: any) => u.sendEmailVerification())
      .then(() => {
        this.notifier.notify('success', 'Verification email sent!');
      });
  }

  ForgotPassword(passwordResetEmail: string) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        this.notifier.notify(
          'success',
          'Password reset email was sent, check your inbox.'
        );
      })
      .catch((error) => {
        this.notifier.notify('error', error.message);
        console.log(error.message);
      });
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null;
  }

  // && user.emailVerified != false ? true : false

  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider()).then((res: any) => {
      this.router.navigate(['/dashboard']);
    });
  }

  // Function that runs the auth logic providers

  AuthLogin(provider: any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        this.router.navigate(['/dashboard']);
        this.SetUserData(result.user);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // Function that sets the user data when a user logs-in using email/password or social-auth in Firebase

  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `usersAuth/${user.uid}`
    );
    const userData: UserAuth = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };
    return userRef.set(userData, { merge: true });
  }

  LogOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['/login']);
    });
  }

  registerUser(user: any) {
    this.firestoreCollection.add({
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      age: user.age,
      password: user.password,
      isAdmin: false,
    });
  }

  updateUser(user: any, uid: any) {
    this.firestoreCollectionAuth.doc(uid).update({ password: user.password });
    this.userData
      .updatePassword(user.password)
      .then(() => {
        this.notifier.notify('success', 'Password updated successfully');
      })
      .catch((err) => {
        this.notifier.notify('error', 'Something went wrong');
        console.log(err);
      });
  }

  deleteUser(user: any) {
    this.firestoreCollection.doc(user.uid).delete();
  }

  redirectLogin() {
    this.router.navigate(['/login']);
  }
}
///////////////
