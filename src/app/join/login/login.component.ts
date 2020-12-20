import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from "@angular/router";

import { MatSnackBar } from '@angular/material/snack-bar';
import { trigger, transition, useAnimation, query, animateChild } from '@angular/animations';
import { fadeInAnimation, slideIcon } from '../../animations';
import { NgxSpinnerService } from "ngx-spinner";
import { AuthenticationService } from 'src/app/services/auth-services/authentication.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
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
export class LoginComponent implements OnInit {
  hide:boolean=true;
  constructor(private spinner: NgxSpinnerService, 
              private router: Router,
              private authService :AuthenticationService,
              private _snackBar : MatSnackBar) {}

  ngOnInit() {
    
  }
  login(LGform : NgForm){
    if(LGform.invalid){
      return;
    }
    this.spinner.show();
    const email = LGform.controls.email.value;
    const password = LGform.controls.password.value;
    this.authService.login(email,password).subscribe(resData => {
      this.spinner.hide();
      console.log(resData);
    },
    errorMessage => {
      this.spinner.hide();
      this._snackBar.open(errorMessage, "Dissmiss", {
        duration: 3600000,
      });
    });

    LGform.reset();
    LGform.resetForm();  
  }

  onSwitch(){
    this.router.navigate(["/signup"]);
  }

  
  
}
