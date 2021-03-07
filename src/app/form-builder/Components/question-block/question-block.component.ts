import { take } from 'rxjs/operators';
import { Component, OnInit, ViewRef, OnDestroy, Injector } from '@angular/core';
import { LongAnswerComponent } from './../long-answer/long-answer.component';
import { McqComponent } from './../mcq/mcq.component';
import { QuestionBlockService } from 'src/app/assesment/services/question-block.service';
import { Subscription } from 'rxjs';
import { QuidServive } from './Quid.service'

@Component({
  selector: 'app-question-block',
  templateUrl: './question-block.component.html',
  styleUrls: ['./question-block.component.css'],
})
export class QuestionBlockComponent implements OnInit, OnDestroy {
  updateIndexSubscription!: Subscription;
  subscription!: Subscription;
  componentOutlet;
  isSelected = false;
  myindex!: number;
  myView!: ViewRef;
  myType;
  myTitle;
  myDescription;
  myCorrectValue;
  myOrder;
  myQuid;
  myPoints;
  isRequired;
  myOptions;
  myWordLimit;
  myQindex;
  fuid;
  uid;

  selected = `<img
                  class="mr-5"
                  src="https://img.icons8.com/material/24/000000/unchecked-radio-button--v1.png"
                  width="20px"
                />
                Multiple Choice`;

  constructor(
    private qblock: QuestionBlockService,
    private quidService: QuidServive
  ) {
    this.subscription = this.qblock.selected$.subscribe((x) => {
      this.isSelected = x;
    });
    this.updateIndexSubscription = this.qblock.updateIndexes$.subscribe((x) => {
      if (x) {
        this.myindex = this.qblock.getMyIndex(this.myView);
      }
    });
  }

  ngOnInit(): void {
    this.updateType(this.myType);
    this.quidService.Quid = this.myQuid;
    console.log(this.myQindex);
  }

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
    this.qblock
      .getLastestFormData(this.fuid, this.uid)
      .pipe(take(1))
      .subscribe((data) => {
        data.Questions.find((question) => {
          if (question.Quid == this.myQuid) {
            question.type = type;
            // if(type == 'LA'){
            //   question.options=[{}];
            // }
            // else{
            //   question.options = [
            //     {
            //       optionId: this.qblock.getOpuid,
            //       optionValue: 'New Option',
            //       optionOrder: '1',
            //     },
            //   ];
            // }
            return;
          }
        });
        this.qblock.pushChanges(data, this.uid, this.fuid);
        console.log(data);
        
      });
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
    this.qblock
      .getLastestFormData(this.fuid, this.uid)
      .pipe(take(1))
      .subscribe((data) => {
        data.Questions.splice(this.myQindex, this.myQindex + 1);
        const newFormData = data;
        this.qblock.pushChanges(newFormData, this.uid, this.fuid);
      });
  }

  updateType(type: string) {
    switch (type) {
      case 'LA':
        this.selected = `<i class="fas fa-align-left mr-5 fa-1x"></i>
                Paragraph`;
        break;
      case 'MCQ':
        this.selected = `<img
                  class="mr-5"
                  src="https://img.icons8.com/material/24/000000/unchecked-radio-button--v1.png"
                  width="20px"
                />
                Multiple Choice`;
        this.qblock.changeChoiceQuestionType('MCQ');
        break;

      case 'DRD':
        this.selected = `<i class="fas fa-chevron-circle-down mr-5 fa-1x"></i> Drop Down`;
        this.qblock.changeChoiceQuestionType('DRD');
        break;

      case 'CHK':
        this.selected = `<i class="far fa-check-square mr-5 fa-1x"></i>
                Checkboxes`;
        this.qblock.changeChoiceQuestionType('CHK');
        break;

      default:
        this.componentOutlet = McqComponent;
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
  showDropdown(dropdown: HTMLDivElement) {
    if (dropdown.style.display == 'block') {
      dropdown.style.display = 'none';
    } else {
      dropdown.style.display = 'block';
    }
  }
  onUpdatePoints(event: any) {
    this.qblock
      .getLastestFormData(this.fuid, this.uid)
      .pipe(take(1))
      .subscribe((data) => {
        if (event.target.value.length < 1) {
          return;
        } else {
          data.Questions.find((question) => {
            if (question.Quid == this.myQuid) {
              question.points = event.target.value;
              return;
            }
          });
          this.myPoints = event.target.value;
          this.qblock.pushChanges(data, this.uid, this.fuid);
        }
      });
  }
  onUpdateTitle(event){
    this.qblock
      .getLastestFormData(this.fuid, this.uid)
      .pipe(take(1))
      .subscribe((data) => {
        if (event.target.value.length < 1) {
          return;
        } else {
          data.Questions.find((question) => {
            if (question.Quid == this.myQuid) {
              question.title = event.target.value;
              return;
            }
          });
          this.myTitle = event.target.value;
          console.log(data);
          this.qblock.pushChanges(data, this.uid, this.fuid);
        }
      });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.updateIndexSubscription.unsubscribe();
  }
}
