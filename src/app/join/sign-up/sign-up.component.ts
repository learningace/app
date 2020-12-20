import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { trigger, transition, useAnimation, query, animateChild } from '@angular/animations';
import { fadeInAnimation, slideIcon } from '../../animations';
import { Router } from "@angular/router";

import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxSpinnerService } from "ngx-spinner";
import { AuthenticationService } from 'src/app/services/auth-services/authentication.service';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  animations: [
    trigger('todoAnimation', [
      transition(':enter', [
        useAnimation(fadeInAnimation, {
          params: {
            duration: '1000ms'
          }
        }),
        query('@slide', 
        animateChild())
        
      ])
    ]),
    trigger('slide', [
      transition(':enter', [
        useAnimation(slideIcon, {
          params: {
            duration: '2000ms'
          }
        })
      ]),
    ])
  ]
})
export class SignUpComponent {
  hide:boolean=true;

  constructor(private router : Router, 
              private AuthSeervice : AuthenticationService,
              private spinner: NgxSpinnerService,
              private _snackBar: MatSnackBar) { }

  onSwitch(){
    this.router.navigate(["/login"])

  }
  signup(SUform : NgForm){
    if(SUform.invalid){
      return;
    }
    this.spinner.show();
    const email = SUform.controls.email.value;
    const password = SUform.controls.password.value;
    this.AuthSeervice.signup(email,password).subscribe(resData => {
      this.spinner.hide();
    },
    errorMessage => {
      this.spinner.hide();
      this._snackBar.open(errorMessage, "Dissmiss", {
        duration: 3600000,
        panelClass: ['bg-danger']
      });
    });

    SUform.reset();
    SUform.resetForm();
    
 }
  

}
