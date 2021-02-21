import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './../../join/authentication.service';
import { SnackbarService } from 'ngx-snackbar';

@Component({
  selector: 'app-instructor-dashboard',
  templateUrl: './instructor-dashboard.component.html',
  styleUrls: ['./instructor-dashboard.component.css']
})
export class InstructorDashboardComponent implements OnInit {

  constructor(private auth:AuthenticationService,
    private router:Router,
    private snackbar:SnackbarService) { }

  ngOnInit(): void {
  }

  signOut(){
    this.auth.logout();
  }
}
