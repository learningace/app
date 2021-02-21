import { AppUser } from './appuser.model';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActionCodeSettings } from '@firebase/auth-types';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable,of } from 'rxjs';
import { User } from '@firebase/auth-types';
import { map, take, switchMap, } from 'rxjs/operators';
import { SnackbarService } from 'ngx-snackbar';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  user$: Observable<User | null>;
  isLoggedIn$: Observable<boolean>;
  appUser$: Observable<any>;

  constructor(
    private firebaseAuthentication: AngularFireAuth,
    private firestore: AngularFirestore,
    private snackbar: SnackbarService,
    private router: Router
  ) {
    this.user$ = firebaseAuthentication.authState;
    this.isLoggedIn$ = firebaseAuthentication.authState.pipe(
      map((user) => !!user)
    );
    this.appUser$ = firebaseAuthentication.authState.pipe(
      switchMap((value) => {
        if (value) {
          return this.firestore
            .doc(`users/${value.uid}`)
            .valueChanges()
            .pipe(take(1));
        } else {
          return of(null);
        }
      })
    );
  }

  async login(email: string, password: string) {
    const data = await this.firebaseAuthentication
      .signInWithEmailAndPassword(email, password)
      .catch((err) => {
        this.errorHandler(err);
      });
    if (data) {
      this.appUser$.pipe(take(1)).subscribe((appUser) => {
        const role = appUser.default_role;
        this.redirectLoggedInTo(role);
        this.snackbar.clear();
      });
    }
  }

  logout() {
    this.firebaseAuthentication
      .signOut()
      .then(() => this.router.navigate(['/']));
  }

  errorHandler(error: any) {
    let message = 'Unknown Error occured';
    switch (error.code) {
      case 'auth/invalid-email':
        message = 'Invalid E-mail and password combination. Try Again';
        break;
      case 'auth/user-disabled':
        message = `Your account has been <strong>disabled</strong> due to many unsuccessful log in attempts<br>Try again after sometime or contact administrator`;
        break;
      case 'auth/user-not-found':
        message = `Invalid E-mail and password combination. Try Again`;
        break;
      case 'auth/wrong-password':
        message = `Invalid E-mail and password combination. Try Again`;
        break;
      default:
        message = error.message;
    }
    this.snackbar.add({
      msg: message,
      background: '#ffcccb',
      color: 'red',
      timeout: 60000,
      action: {
        text: 'Close',
        color: 'red',
      },
    });
  }

  redirectLoggedInTo(role: string) {
    switch (role) {
      case 'LEARNER':
        this.router.navigate(['/learner']);
        break;
      case 'INSTRUCTOR':
        this.router.navigate(['/instructor']);
        break;
      default:
        this.logout();
    }
  }

  sendForgetPasswordLink(email: string, setting: ActionCodeSettings) {
    this.firebaseAuthentication.sendPasswordResetEmail(email,setting).then(()=>{
      this.snackbar.add({
        msg: `A password reset link has been sent to your email 
        <br>Check your email to reset the password `,
        background: '#4BB543',
        color:'white',
        timeout:60000,
        action:{
          text:'Close',
          color:'white'
        }
      });
    });
  }

  async registerNewUser(displayName:string,email:string,password:string,role:string){
   await this.firebaseAuthentication.createUserWithEmailAndPassword(email,password).then((onSuccess)=>{
      if (onSuccess) {
        this.firestore
          .doc(`users/${onSuccess.user?.uid}`)
          .set({
            default_role: role,
            email: onSuccess.user?.email,
            uid: onSuccess.user?.uid,
          })
          .then(()=>{
            this.snackbar.add({
              msg:'Registration Successfull',
              background:'#4BB543',
              color:'white',
              timeout:10000,
              action:{
                text:'Close'
              }
            });
            this.redirectLoggedInTo(role);
            this.snackbar.clear();
          });
      }
   });
  }
}
