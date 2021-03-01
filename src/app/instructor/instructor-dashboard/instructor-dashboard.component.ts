import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './../../join/authentication.service';
import { SnackbarService } from 'ngx-snackbar';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-instructor-dashboard',
  templateUrl: './instructor-dashboard.component.html',
  styleUrls: ['./instructor-dashboard.component.css'],
})
export class InstructorDashboardComponent implements OnInit {
  isEmailVerified = true;

  constructor(
    private auth: AuthenticationService,
    private router: Router,
    private snackbar: SnackbarService
  ) {}

  ngOnInit(): void {
    this.auth.user$.pipe(take(1)).subscribe((user) => {
      if (user) {
        if (user.emailVerified == false) {
          this.isEmailVerified = false;
        }
      }
    });
  }

  signOut() {
    this.auth.logout();
  }

  onAssesment(){
    this.router.navigate(['/instructor/assesment']);
  }
}
