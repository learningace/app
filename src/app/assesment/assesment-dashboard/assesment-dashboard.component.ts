import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { GetUserService } from './../services/get-user.service';
import { QuestionBlockService } from 'src/app/assesment/services/question-block.service';

@Component({
  selector: 'app-assesment-dashboard',
  templateUrl: './assesment-dashboard.component.html',
  styleUrls: ['./assesment-dashboard.component.css'],
})
export class AssesmentDashboardComponent implements OnInit, OnDestroy {
  uidSubscription!:Subscription;
  constructor(
    private router: Router,
    private user: GetUserService,
    private firestore: AngularFirestore,
    private qblock: QuestionBlockService
  ) {}

  ngOnInit(): void {}
  onCreateAssesment() {
    this.router.navigate(['/instructor/assesment/create']);
  }

  onFormEdit() {
    this.router.navigate(['instructor/assesment/edit']);
  }

  onFormCreate() {
    const data = this.qblock.freshAssessmentTemplate();
    const fuid = data.metadata[0].formId;
   this.uidSubscription = this.user.getCurrentUser().subscribe((user) => {
      if (user) {
        this.firestore
          .doc(`assessments/${user.uid}`)
          .update({
            [fuid]: data,
          })
          .then((x) => {
            this.router.navigate([`instructor/assesment/${fuid}/edit`]);
          });
      }
    });
  }

  ngOnDestroy(){
    this.uidSubscription.unsubscribe();
  }
}
