import { Injectable, ViewContainerRef, ViewRef } from '@angular/core';
import { Subject } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { take, map } from 'rxjs/operators';

export interface formData {
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
      title: string;
      descriptoin?: string;
      correct?: string;
      order: string;
      Quid: string;
      points: string;
      required: boolean;
      options?: [
        {
          optionValue: string;
          optionId: string;
          optionOrder: string;
        }
      ];
      wordLimit?: string;
    }
  ];
  newQuid?: string;
}

export interface question {
  type: string;
  title: string;
  descriptoin: string;
  correct?: string;
  order: string;
  Quid: string;
  points: string;
  required: boolean;
  options?: [
    {
      optionValue: string;
      optionId: string;
      optionOrder: string;
    }
  ];
  wordLimit?: string;
}

@Injectable({
  providedIn: 'root',
})
export class QuestionBlockService {
  selected$ = new Subject<boolean>();
  choiceQuestionType$ = new Subject<string>();
  updateIndexes$ = new Subject<boolean>();
  private viewCotainerRef!: ViewContainerRef;
  constructor(private firestore: AngularFirestore) {
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
    const _uid = Date.now() + 2345;
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
          title: 'Untitled Question',
          descriptoin: '',
          correct: 'i am correct',
          order: '1',
          Quid: this.getQuid(),
          points: '1',
          required: true,
          options: [
            {
              optionValue: 'Option 1',
              optionId: this.getOpuid(),
              optionOrder: '1',
            },
          ],
        },
      ],
    };
    return assessmentData;
  }

  newQuestion(oldata: string, uid: string, fid: string) {
    const _oldData = oldata;
    const oldData: formData = JSON.parse(_oldData);
    const Quid = this.getQuid();
    oldData.Questions.push({
      type: 'MCQ',
      title: '',
      descriptoin: '',
      correct: '',
      order: '',
      required: true,
      Quid: Quid,
      points: '1',
      options: [
        {
          optionValue: 'New Option',
          optionId: this.getOpuid(),
          optionOrder: '1',
        },
      ],
    });
    const updatedData = oldData;
    this.firestore
      .doc(`assessments/${uid}`)
      .update({
        [fid]: updatedData,
      })
      .then(() => {});
    updatedData.newQuid = Quid;
    return updatedData;
  }

  pushChanges(newData, uid, fid) {
    this.firestore
      .doc(`assessments/${uid}`)
      .update({
        [fid]: newData,
      })
      .then(() => {});
  }
  getOpDefaultValue() {
    const _time = Date.now().toString().slice(-5);
    const time = Object.values(_time);
    var random = '';
    time.forEach((element) => {
      switch (element) {
        case '0':
          random += 'A';
          break;
        case '1':
          random += 'B';
          break;
        case '2':
          random += 'C';
          break;
        case '3':
          random += 'D';
          break;
        case '4':
          random += 'E';
          break;
        case '5':
          random += 'F';
          break;
        case '6':
          random += 'G';
          break;
        case '7':
          random += 'H';
          break;
        case '9':
          random += 'I';
          break;
      }
    });
    return random;
  }

  getLastestFormData(fid: string, uid:string) {
    return this.firestore.doc(`assessments/${uid}`).valueChanges()
    .pipe(take(1),map(x=>{
      const data:any = x
      return data[fid];
    }));
  }
}
