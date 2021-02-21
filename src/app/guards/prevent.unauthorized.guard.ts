import { Injectable } from '@angular/core';
import { Router, CanLoad } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../join/authentication.service';
import { SnackbarService } from 'ngx-snackbar';
import { map, take } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class PreventUnauthorizedGuard implements CanLoad {
  constructor(
    private auth: AuthenticationService,
    private router: Router,
    private snackbar: SnackbarService
  ) {}

  canLoad(): Observable<boolean> {
    return this.auth.isLoggedIn$.pipe((map(user=>{
       if (user) return true;
       this.snackbar.add({
        msg:`<strong>Log in </strong> to view this module`,
        background:'#ffcccb',
        color:'red',
        timeout:60000,
        action:{
          text:'Close',
          color:'red'
        }
       });
       this.router.navigate(['/join']);
       return false;
    })));
  }
}
