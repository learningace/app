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
  componentOutlet;
  isSelected = false;
  myindex!: number;
  myView!: ViewRef;
  subscription!: Subscription;
  updateIndexSubscription!: Subscription;
  selected = `<img
                  class="mr-5"
                  src="https://img.icons8.com/material/24/000000/unchecked-radio-button--v1.png"
                  width="20px"
                />
                Multiple Choice`;

  constructor(private qblock: QuestionBlockService) {
    this.subscription = this.qblock.selected$.subscribe((x) => {
      this.isSelected = x;
    });
    this.updateIndexSubscription = this.qblock.updateIndexes$.subscribe((x) => {
      if (x) {
        this.myindex = this.qblock.getMyIndex(this.myView);
      }
    });
  }

  ngOnInit(): void {}

  ChangeKind(kind, dropdown: HTMLDivElement) {
    const type = kind;
    switch (type) {
      case 'LA':
        this.componentOutlet = LongAnswerComponent;
        this.selected = `<i class="fas fa-align-left mr-5 fa-1x"></i>
                Paragraph`;
        break;
      case 'MCQ':
        this.componentOutlet = McqComponent;
        this.selected = `<img
                  class="mr-5"
                  src="https://img.icons8.com/material/24/000000/unchecked-radio-button--v1.png"
                  width="20px"
                />
                Multiple Choice`;
        this.qblock.changeChoiceQuestionType('MCQ');
        break;

      case 'DRD':
        this.componentOutlet = McqComponent;
        this.selected = `<i class="fas fa-chevron-circle-down mr-5 fa-1x"></i> Drop Down`;
        this.qblock.changeChoiceQuestionType('DRD');
        break;

      case 'CHK':
        this.componentOutlet = McqComponent;
        this.selected = `<i class="far fa-check-square mr-5 fa-1x"></i>
                Checkboxes`;
        this.qblock.changeChoiceQuestionType('CHK');
        break;

      default:
        this.componentOutlet = McqComponent;
    }
    dropdown.style.display = 'none';
  }
  onFocus(event) {
    event.stopPropagation();
    this.qblock.hideQuestionBlock();
    this.isSelected = true;
  }
  onDeleteMe() {
    const ref = this.qblock.getViewContainerRef();
    this.qblock.updateIndexes$.next(true);
    ref.remove(this.myindex);
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
  showDropdown(dropdown: HTMLDivElement) {
    if(dropdown.style.display == 'block'){
      dropdown.style.display = 'none';
    }
    else{
      dropdown.style.display = 'block';
    }
    
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.updateIndexSubscription.unsubscribe();
  }
}
