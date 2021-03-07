import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  AngularFirestore,
} from '@angular/fire/firestore';
import { GetUserService } from './../services/get-user.service';
import { QuestionBlockService } from 'src/app/assesment/services/question-block.service';
import firebase from 'firebase/app';

@Component({
  selector: 'app-assesment-dashboard',
  templateUrl: './assesment-dashboard.component.html',
  styleUrls: ['./assesment-dashboard.component.css'],
})
export class AssesmentDashboardComponent implements OnInit, OnDestroy {
  assessmentList;
  noData=false;
  uid;
  docRef;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private user: GetUserService,
    private firestore: AngularFirestore,
    private qblock: QuestionBlockService
  ) {}

  ngOnInit(): void {
    this.uid = this.activatedRoute.snapshot.data.uid;
    this.getAssessmentList();
  }
  onCreateAssesment() {
    this.router.navigate(['/instructor/assesment/create']);
  }

  getAssessmentList(){
    if (this.uid) {
      this.docRef = this.firestore.doc(`assessments/${this.uid}`);

      this.docRef.get().subscribe((x: any) => {
        const _data = Object.values(x.data());
        if (_data.length == 0) {
          this.noData = true;
          this.assessmentList = Object.values({});
        } else {
          this.assessmentList = Object.values(x.data());
          this.noData = false;
        }
      });
    }
  }
  onFormEdit(fuid: string) {
    this.router.navigate([`instructor/assesment/${fuid}/edit`]);
    console.log(`instructor/assesment/${fuid}/edit`);
  }

  onFormCreate() {
    const data = this.qblock.freshAssessmentTemplate();
    const fuid = data.metadata[0].formId;
    if (this.uid) {
      this.firestore
        .doc(`assessments/${this.uid}`)
        .update({
          [fuid]: data,
        })
        .then((x) => {
          this.router.navigate([`instructor/assesment/${fuid}/edit`]);
        });
    }
  }
  OnDelteForm(formId,event,formTitle){
    event.stopPropagation();
    console.log('Do you wanna delete the form with form id : ', formId);
    var confrm = window.confirm(`Do You Wanna Delete " ${formTitle} " Assessment`);
    if(confrm){
     var removeCapital= this.docRef.update({
        [formId]: firebase.firestore.FieldValue.delete(),
      });
      removeCapital.then(()=>{
       this.getAssessmentList();
      });
    }
    else{
      return;
    }
  }

  ngOnDestroy() {}
}
