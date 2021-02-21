import { AuthenticationService } from './../authentication.service';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from "rxjs/operators";
import { SetTitleService } from './../../set-title.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  hide = true;
  confrmPasswordError = true;
  loading = false;
  backdrop = false;
  constructor(
    private title: SetTitleService,
    private router: Router,
    private auth: AuthenticationService
  ) {
    this.title.setTitle('LearningAce | Register');
  }

  ngOnInit() {
    this.auth.appUser$.pipe(take(1)).subscribe((appuser) => {
      if (appuser) {
        this.auth.redirectLoggedInTo(appuser.default_role);
      } else {
        this.backdrop = true;
      }
    });
  }

  register(RGform: NgForm) {
    this.loading = true;
    const email = RGform.controls.email.value;
    const displayName =
      RGform.controls.first_name.value + ' ' + RGform.controls.last_name.value;
    const password = RGform.controls.password.value;
    const role = RGform.controls.user_role.value;
    this.auth.registerNewUser(displayName, email, password, role).finally(()=>this.loading=false);
  }

  checkPassword(password: string, cnfrmpassword: string) {
    if (password == cnfrmpassword) {
      this.confrmPasswordError = false;
    } else {
      this.confrmPasswordError = true;
    }
  }
  onSwitch() {
    this.router.navigate(['/join']);
  }
}
