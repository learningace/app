import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../join/authentication.service';
import { SnackbarService } from 'ngx-snackbar';
import { map } from 'rxjs/operators';
import { AppUser } from './../join/appuser.model';

@Injectable({ providedIn: 'root' })
export class InstructorLoadGuard implements CanLoad {
  constructor(
    private auth: AuthenticationService,
    private router: Router,
    private snackbar: SnackbarService
  ) {}

  canLoad(): Observable<boolean> {
    return this.auth.appUser$.pipe(
      map((appUser:AppUser) => {
        if(appUser.default_role == 'INSTRUCTOR'){
          return true;
        }
        this.snackbar.add({
          msg: `<strong>Unathourized Access</strong>`,
          background: '#ffcccb',
          color: 'red',
          action: {
            text: 'Close',
            color: 'red',
          },
        });
        this.router.navigate(['/']);
        return false;
      })
    );
  }
}
