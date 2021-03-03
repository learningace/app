import { Injectable, ViewContainerRef, ViewRef } from '@angular/core';
import { time } from 'console';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuestionBlockService {
  selected$ = new Subject<boolean>();
  choiceQuestionType$ = new Subject<string>();
  updateIndexes$ = new Subject<boolean>();
  private viewCotainerRef!: ViewContainerRef;
  constructor() {
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

  changeChoiceQuestionType(type:string){
    switch(type){
      case 'MCQ':
        this.choiceQuestionType$.next('MCQ');
        break;
      case 'CHK' :
        this.choiceQuestionType$.next('CHK');
        break;
      case 'DRD':
        this.choiceQuestionType$.next('DRD');
        break;
      default:
        this.choiceQuestionType$.next('MCQ');
    }
  }
  
  getMyIndex(viewRef : ViewRef){
    return this.viewCotainerRef.indexOf(viewRef);
  }

  getQuid(){
    return 'Q'+ Date.now();
  }

  getFuid(){
    return 'F' + Date.now();
  }
  getOpuid(){
    return 'OP' + Date.now();
  }
}
