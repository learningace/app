import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ActionCodeSettings } from '@firebase/auth-types';

import { take } from 'rxjs/operators';
import { AuthenticationService } from './../authentication.service';
import { SetTitleService } from './../../set-title.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  hide: boolean = true;
  submitDisabled = false;
  loading = false;
  backdrop = true;
  constructor(
    private router: Router,
    private title: SetTitleService,
    public authentication: AuthenticationService
  ) {}

  ngOnInit() {
    this.title.setTitle('LearningAce | Sign In');
    this.authentication.appUser$.pipe(take(1)).subscribe((appuser) => {
      if (appuser) {
        this.authentication.redirectLoggedInTo(appuser.default_role);
      } else {
        this.backdrop = false;
      }
    });
  }

  login(LGform: NgForm) {
    console.log('Caliing Login...');
    this.loading = true;
    if (LGform.invalid) {
      return;
    }
    const email = LGform.controls.email.value;
    const password = LGform.controls.password.value;
    this.authentication.login(email, password).then(() => {
      this.loading = false;
    });
  }

  onSwitch() {
    this.router.navigate(['join/register']);
  }

  onForgotPassword(LGform: NgForm) {
    const email = LGform.controls.email.value;
    let url: ActionCodeSettings = {
      url: 'http://localhost:4200/join',
    };
    this.authentication.sendForgetPasswordLink(email, url);
  }
}
