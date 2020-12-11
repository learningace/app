import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { trigger, transition, useAnimation } from '@angular/animations';
import { fadeInAnimation } from './../animations';
@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.css'],
  animations: [
    trigger('todoAnimation', [
      transition(':enter', [
        useAnimation(fadeInAnimation, {
          params: {
            duration: '1s'
          }
        })
      ]),
    ])
  ]
})
export class JoinComponent implements OnInit {
  
  constructor(private spinner: NgxSpinnerService) {}

  ngOnInit() {
    
  }

  
  
}
