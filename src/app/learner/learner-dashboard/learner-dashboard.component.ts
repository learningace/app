import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators'
import { AuthenticationService } from './../../join/authentication.service';
import { SnackbarService } from 'ngx-snackbar';

@Component({
  selector: 'app-learner-dashboard',
  templateUrl: './learner-dashboard.component.html',
  styleUrls: ['./learner-dashboard.component.css'],
})
export class LearnerDashboardComponent implements OnInit {
  userEmail: String | null = '';
  isEmailVerified = true;
  constructor(
    private auth: AuthenticationService,
    private snackbar: SnackbarService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.auth.user$.pipe(take(1)).subscribe((user) => {
      if (user) {
        this.userEmail = user.email;
        if (user.emailVerified == false) {
          this.isEmailVerified = false;
        }
      }
    });
  }
  signOut() {
    this.auth.logout();
  }
}
