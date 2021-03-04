import { Injectable, ViewContainerRef, ViewRef } from '@angular/core';
import { Subject } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

interface formData {
  metadata: [
    {
      title: string;
      description: string;
      dateCreated: string;
      formId: string;
    }
  ];
  Questions: [
    {
      type: string;
      choiceType?:string;
      title: string;
      descriptoin?: string;
      correct?: string;
      order: string;
      Quid: string;
      points: string;
      options?: [{
        optionValue : string;
        optionId : string;
        optionOrder : string;
      }];
    }
  ];
}

interface question {
  type: string;
  choiceType?: string;
  title: string;
  descriptoin: string;
  correct?: string;
  order: string;
  Quid: string;
  points: string;
  options?: [
    {
      optionValue: string;
      optionId: string;
      optionOrder: string;
    }
  ];
}

@Injectable({
  providedIn: 'root',
})
export class QuestionBlockService {
  selected$ = new Subject<boolean>();
  choiceQuestionType$ = new Subject<string>();
  updateIndexes$ = new Subject<boolean>();
  private viewCotainerRef!: ViewContainerRef;
  constructor(private firestore : AngularFirestore) {
    this.selected$.next(false);
    this.choiceQuestionType$.next('MCQ');
    this.updateIndexes$.next(false);
  }

  hideQuestionBlock() {
    this.selected$.next(false);
  }

  updateViewContainerRef(ref: ViewContainerRef) {
    this.viewCotainerRef = ref;
  }

  getViewContainerRef() {
    return this.viewCotainerRef;
  }

  subcriberList() {
    return this.selected$.observers;
  }

  changeChoiceQuestionType(type: string) {
    switch (type) {
      case 'MCQ':
        this.choiceQuestionType$.next('MCQ');
        break;
      case 'CHK':
        this.choiceQuestionType$.next('CHK');
        break;
      case 'DRD':
        this.choiceQuestionType$.next('DRD');
        break;
      default:
        this.choiceQuestionType$.next('MCQ');
    }
  }

  getMyIndex(viewRef: ViewRef) {
    return this.viewCotainerRef.indexOf(viewRef);
  }

  getQuid() {
    const _uid =  Date.now() + 2345;
    return 'Q' + _uid.toString();
  }

  getFuid() {
    const _uid = Date.now() + 1234;
    return _uid.toString();
  }
  getOpuid() {
    const _uid = Date.now() + 3456;
    return 'OP' + _uid.toString();
  }

  freshAssessmentTemplate() {
    const assessmentData: formData = {
      metadata: [
        {
          title: 'Untitled Assesment',
          description: '',
          dateCreated: Date.now().toString(),
          formId: this.getFuid(),
        },
      ],
      Questions: [
        {
          type: 'MCQ',
          title: 'I am a MCQ type question',
          descriptoin: '',
          choiceType : 'MCQ',
          correct: 'i am correct',
          order: '1',
          Quid: this.getQuid(),
          points: '1',
          options: [{
            optionValue : 'Option 1',
            optionId : this.getOpuid(),
            optionOrder : '1'
          }],
        },
      ],
    };
    return assessmentData;
  }

  newQuestion(oldata:string,uid:string,fid:string){
    const _oldData =  oldata;
    const oldData:formData = JSON.parse(_oldData);
      oldData.Questions.push({
      type:'MCQ',
      choiceType:'MCQ',
      title:'',
      descriptoin:'',
      correct:'',
      order:'',
      Quid:this.getQuid(),
      points:'1',
      options:[{
        optionValue:'New Option',
        optionId:this.getOpuid(),
        optionOrder:'1'
      }]
    });
    const updatedData = oldData;
    console.log(updatedData);
    this.firestore.doc(`assessments/${uid}`).update({
      [fid]:updatedData
    }).then(()=>{

    });
  }
}
