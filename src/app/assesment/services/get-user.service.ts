import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class GetUserService {
  constructor(private auth: AngularFireAuth) {}

  getCurrentUser() {
    return this.auth.authState;
  }
}
