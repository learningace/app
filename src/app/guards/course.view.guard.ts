import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../join/authentication.service';
import { SnackbarService } from 'ngx-snackbar';
import { map } from 'rxjs/operators';
import { AppUser } from './../join/appuser.model';

@Injectable({ providedIn: 'root' })
export class CourseViewGuard implements CanActivate {
  constructor(
    private auth: AuthenticationService,
    private router: Router,
    private snackbar: SnackbarService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.auth.appUser$.pipe(
      map((appUser: AppUser) => {
        var proceed = appUser.courses.find((course)=>{
            if (course.courseId == route.url[0].path) {
              return true;
            } 
            else{
                return false;
            }
        });
        if(proceed){
            return true;
        }
        else{
            this.snackbar.add({
              msg: `<strong>You are not the instructor for this course</strong>`,
              background: '#ffcccb',
              color: 'red',
              action: {
                text: 'Close',
                color: 'red',
              },
            });
            this.router.navigate(['/']);
            return false;
        }
      })
    );
  }
}
