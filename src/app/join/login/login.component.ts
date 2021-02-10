import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { AuthenticationService } from 'src/app/shared-module/services/authentication.service';
import { SetTitleService } from './../../set-title.service';
import { SnackbarService } from 'ngx-snackbar';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  hide: boolean = true;
  submitDisabled = false;
  loading = false;
  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private title: SetTitleService,
    private snackbar : SnackbarService
  ) {}

  ngOnInit() {
    this.title.setTitle('LearningAce | Sign In');
  }

  login(LGform: NgForm) {
    this.loading = true;
    if (LGform.invalid) {
      return;
    }
    const email = LGform.controls.email.value;
    const password = LGform.controls.password.value;
    LGform.controls.email.disable();
    LGform.controls.password.disable();
    this.submitDisabled = true;
    this.authService.login(email, password).pipe
    (finalize( ()=>{
      this.loading = false;
      LGform.reset();
      LGform.resetForm();
      LGform.controls.email.enable();
      LGform.controls.password.enable();
      this.submitDisabled = false;
    }))
    .subscribe(
      (resData) => {
        console.log(resData);
      },
      (errorMessage) => {
        this.snackbar.add({
          msg: errorMessage,
          background: 'palevioletred',
          action: {
            text: 'Close',
            color: 'red',
          },
        });
      }
    );
  }

  onSwitch() {
    this.router.navigate(['join/register']);
  }

  onForgotPassword(){
    console.log('OKAY !!! Dont Worry we will do something');
  }
}