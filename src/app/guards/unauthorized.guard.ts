import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../join/authentication.service';
import { SnackbarService } from 'ngx-snackbar';
import { map, take } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UnauthorizedGuard implements CanActivate {
  constructor(
    private auth: AuthenticationService,
    private router: Router,
    private snackbar: SnackbarService
  ) {}

  canActivate(): Observable<boolean> {
    return this.auth.isLoggedIn$.pipe(
      map((user) => {
        if (user) return true;
        this.snackbar.add({
          msg: `<strong>Log in </strong> to get enrolled in this course`,
          background: '#ffcccb',
          color: 'red',
          timeout: 60000,
          action: {
            text: 'Close',
            color: 'red',
          },
        });
        this.router.navigate(['/join']);
        return false;
      })
    );
  }
}

