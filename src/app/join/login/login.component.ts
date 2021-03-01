import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ActionCodeSettings } from '@firebase/auth-types';

import { take } from 'rxjs/operators';
import { AuthenticationService } from './../authentication.service';
import { SetTitleService } from './../../set-title.service';
import { NgxSpinnerService } from 'ngx-spinner';

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
    public authentication: AuthenticationService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.spinner.show();
    this.title.setTitle('LearningAce | Sign In');
    this.authentication.appUser$.pipe(take(1)).subscribe((appuser) => {
      if (appuser) {
        this.authentication.redirectLoggedInTo(appuser.default_role).finally(()=>{this.spinner.hide()});
      } else {
        this.backdrop = false;
        this.spinner.hide();
      }
    });
  }

  async login(LGform: NgForm) {
    this.loading = true;
    if (LGform.invalid) {
      return;
    }
    const email = LGform.controls.email.value;
    const password = LGform.controls.password.value;
    const err = await this.authentication.login(email, password);
    if(err == false) this.loading=false;
  }

  onSwitch() {
    this.router.navigate(['join/register']);
  }

  onForgotPassword(LGform: NgForm) {
    const email = LGform.controls.email.value;
    let url: ActionCodeSettings = {
      url: 'https://learningace.github.io/app/join',
    };
    this.authentication.sendForgetPasswordLink(email);
  }
}
