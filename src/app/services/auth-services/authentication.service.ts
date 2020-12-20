import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';

export interface AuthResponseData {
  kind : string,
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: string;
}

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    
  constructor(private http: HttpClient, private router: Router) {}

  signup(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCs4HiSSBGiYHeoO1yHvfiYJpkZPAtqRwA',
        {
          email: email,
          password: password,
          returnSecureToken: true
        }
      )
      .pipe(
        catchError(this.handleError)
      );
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCs4HiSSBGiYHeoO1yHvfiYJpkZPAtqRwA',
        {
          email: email,
          password: password,
          returnSecureToken: true
        }
      )
      .pipe(
        catchError(this.handleError)
      );
  }

  
  
  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!Try checking your internet connection';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'Entered email address is already in use by another account.';
        break;
      case 'OPERATION_NOT_ALLOWED' :
        errorMessage = 'Password sign-in is disabled. Try again later'
        break;
      case 'TOO_MANY_ATTEMPTS_TRY_LATER' :
        errorMessage = 'We have blocked all requests from this device due to unusual activity.<br> Try again later.'
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'Wrong credentials entered.<br> Check your Email or Password.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'Wrong credentials entered.<br> Check your Email or Password.';
        break;
      case 'ERR_INTERNET_DISCONNECTED' :
        errorMessage = 'You are offline.<br> Connect to internet and then try again';
        break;
      case 'USER_DISABLED' :
        errorMessage = 'The user account has been disabled by the administrator.<br> Contact the administrator'
        break;
    }
    return throwError(errorMessage);
  }
}
