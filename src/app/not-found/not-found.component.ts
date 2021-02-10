import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { SetTitleService } from './../set-title.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css'],
})
export class NotFoundComponent {
  error=true;
  text = "Oops !!! we couldn't find the page you were looking for";
  constructor(private router: Router, private title: SetTitleService) {
    this.title.setTitle('Not Found');
  }

  navigateToHome() {
    this.error=false;
    this.text="REDIRECTING BACK TO HOME ...";
    setTimeout(()=>{ this.router.navigate(['/']);
      this.title.setTitle('LearningAce | Home'); }, 1000);
  }
}
