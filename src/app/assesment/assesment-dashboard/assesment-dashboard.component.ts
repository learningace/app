import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-assesment-dashboard',
  templateUrl: './assesment-dashboard.component.html',
  styleUrls: ['./assesment-dashboard.component.css'],
})
export class AssesmentDashboardComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}
  onCreateAssesment() {
    this.router.navigate(['/instructor/assesment/create']);
  }

  onFormEdit(){
    this.router.navigate(['instructor/assesment/edit']);
  }
}
