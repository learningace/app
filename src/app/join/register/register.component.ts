import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthenticationService } from 'src/app/shared-module/services/authentication.service';
import { SnackbarService } from 'ngx-snackbar';
import { SetTitleService } from './../../set-title.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  hide = true;
  confrmPasswordError = true;
  text = '';
  showSnackbar = false;
  formValue = {};

  constructor(
    private title: SetTitleService,
    private router: Router,
    private auth: AuthenticationService,
    private snackbar: SnackbarService
  ) {
    this.title.setTitle('LearningAce | Register');
  }

  register(RGform: NgForm) {
    this.formValue = RGform.form.value;
    // this.showSnackbar = true;
    // this.text = 'YOU GOT AN ERROR';
    this.snackbar.add({
      msg: 'You are registered',
    });
  }

  checkPassword(password: string, cnfrmpassword: string) {
    if (password == cnfrmpassword) {
      this.confrmPasswordError = false;
    } else {
      this.confrmPasswordError = true;
    }
  }
  onDismiss() {
    this.showSnackbar = false;
  }
  onSwitch() {
    this.router.navigate(['/join']);
  }
}
