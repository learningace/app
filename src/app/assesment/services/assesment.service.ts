import { Injectable } from '@angular/core';
import { AuthenticationService } from 'src/app/join/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AssesmentService {

  constructor(private auth:AuthenticationService) { }

  createAssesment(uid,email){

  }
}
