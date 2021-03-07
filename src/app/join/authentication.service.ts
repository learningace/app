import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActionCodeSettings } from '@firebase/auth-types';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { User } from '@firebase/auth-types';
import { map, take, switchMap } from 'rxjs/operators';
import { CommonService } from './../shared-module/services/common.service';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  user$: Observable<User | null>;
  isLoggedIn$: Observable<boolean>;
  appUser$: Observable<any>;

  constructor(
    private firebaseAuthentication: AngularFireAuth,
    private firestore: AngularFirestore,
    public commonService: CommonService,
    private router: Router,
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
      this.appUser$.pipe(take(1)).subscribe( (appUser) => {
        const role = appUser.default_role;
        this.redirectLoggedInTo(role); 
        this.commonService.snackbarClear();
      });
      return true;
    }
    else{
      return false;
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
      case 'auth/email-already-in-use':
        message = 'This email address is already in use by another account';
        break;
      case 'auth/invalid-email':
        message =
          'Your email address seems invalid. Check your E-mail address and try again';
        break;
      case 'auth/operation-not-allowed':
        message =
          'Authentication is currently disabled by admin. Contact your admin';
        break;
      case 'auth/weak-password':
        message =
          'Entered password is weak. Enter a different password and then try again';
        break;
      default:
        message = error.message;
    }
    this.commonService.snackbarError(message, 30000);
  }

 async redirectLoggedInTo(role: string) {
     switch (role) {
      case 'LEARNER':
       this.router.navigate(['/learner']).then(console.log);
       break;
      case 'INSTRUCTOR':
         this.router.navigate(['/instructor']);
         break;
      default:
        this.logout();
    }
  }

  sendForgetPasswordLink(email: string, setting?: ActionCodeSettings) {
    this.firebaseAuthentication
      .sendPasswordResetEmail(email, setting)
      .then(() => {
        const message = `A password reset link has been sent to your email 
        <br>Check your email to reset the password `;
        this.commonService.snackbarSuccess(message, 30000);
      });
  }

  async registerNewUser(
    displayName: string,
    email: string,
    password: string,
    role: string
  ) {
    await this.firebaseAuthentication
      .createUserWithEmailAndPassword(email, password)
      .then((onSuccess) => {
        if (onSuccess) {
          const emptyCourse:any=[];
          this.firestore
            .doc(`users/${onSuccess.user?.uid}`)
            .set({
              default_role: role,
              email: onSuccess.user?.email,
              uid: onSuccess.user?.uid,
              display_name:displayName,
              courses:emptyCourse
            })
            .then((user) => {
              this.commonService.snackbarSuccess(
                'Registration Successfull',
                30000
              );
              this.redirectLoggedInTo(role);
            });
        }
        onSuccess.user?.updateProfile({displayName});
      })
      .catch((err) => {
        this.errorHandler(err);
      });
  }

  // async checkIfEmailVerified(){
  //   const user = await this.firebaseAuthentication.currentUser;
  //   if(user){
  //     if(user.emailVerified){
  //       return true;
  //     }
  //     else{
  //       return false;
  //     }
  //   }
  //   else{
  //     return;
  //   }l
  // }
}
