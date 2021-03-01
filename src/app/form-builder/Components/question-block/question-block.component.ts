import { Component, OnInit, ViewRef, OnDestroy } from '@angular/core';
import { LongAnswerComponent } from './../long-answer/long-answer.component';
import { McqComponent } from './../mcq/mcq.component';
import { QuestionBlockService } from 'src/app/assesment/services/question-block.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-question-block',
  templateUrl: './question-block.component.html',
  styleUrls: ['./question-block.component.css'],
})
export class QuestionBlockComponent implements OnInit, OnDestroy {
  componentOutlet = McqComponent;
  isSelected = false;
  myindex!: number;
  myView!: ViewRef;
  subscription!: Subscription;

  constructor(private qblock: QuestionBlockService) {
    this.subscription = this.qblock.selected$.subscribe((x) => {
      this.isSelected = x;
    });
  }

  ngOnInit(): void {}

  ChangeKind(event) {
    const type = event.target.value;
    switch (type) {
      case 'LA':
        this.componentOutlet = LongAnswerComponent;
        break;
      case 'MCQ':
        this.componentOutlet = McqComponent;
        break;
    }
  }
  onFocus(event, element: HTMLInputElement) {
    event.stopPropagation();
    this.qblock.hideQuestionBlock();
    this.isSelected = true;
    element.focus();
  }
  onDeleteMe() {
    const ref = this.qblock.getViewContainerRef();
    ref.remove(this.myindex);
  }

  checkSelection(selected:string){
    switch(selected){
      case 'MCQ':
        return true;
      case 'LA':
        return true;
      default:
        return false;
    }
  }
  // onMoveMeUp() {
  //   const ref = this.qblock.getViewContainerRef();
  //   ref.move(this.myView, this.myindex - 1);
  //   this.myindex = ref.indexOf(this.myView);
  // }
  // onMoveMeDown() {
  //   const ref = this.qblock.getViewContainerRef();
  //   ref.move(this.myView, this.myindex + 1);
  //   this.myindex = ref.indexOf(this.myView);
  // }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
