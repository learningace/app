import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { GetUserService } from './get-user.service';
import { map, take } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UserUidResollver implements Resolve<string | null> {
    constructor(private userUid : GetUserService){}
    resolve(route: ActivatedRouteSnapshot): Observable<string | null> | Promise<string> | string {
        return this.userUid.getCurrentUser()
        .pipe(take(1),map((value) => {
            if (value) {
              return value.uid;
            } else {
              return null;
            }
          })
        );
    }
}