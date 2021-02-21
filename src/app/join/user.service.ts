import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '@firebase/auth-types';
import { take} from 'rxjs/operators';
import { AppUser } from './appuser.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private firestore: AngularFirestore) {}

  save(user: User) {
    
  }

  
}