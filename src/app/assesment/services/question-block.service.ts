import { Injectable, ViewContainerRef } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuestionBlockService {
  selected$ = new Subject<boolean>();
  private viewCotainerRef! : ViewContainerRef;
  constructor() {
    this.selected$.next(false);
  }


  hideQuestionBlock() {
    this.selected$.next(false);
  }

  updateViewContainerRef(ref : ViewContainerRef){
    this.viewCotainerRef = ref;
  }
  
  getViewContainerRef(){
    return this.viewCotainerRef;
  }

  subcriberList(){
    return this.selected$.observers;
  }
}
