import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { QuestionBlockService } from 'src/app/assesment/services/question-block.service';
import * as _ from 'lodash';
import { QuidServive } from '../question-block/Quid.service';
import { first, take, map } from 'rxjs/operators';
@Component({
  selector: 'app-mcq',
  templateUrl: './mcq.component.html',
  styleUrls: ['./mcq.component.css'],
})
export class McqComponent implements OnInit, OnDestroy {
  optionDefaultValue = 'Option.';
  showDelete = false;
  optionEmpty = false;
  hideAddOption = false;
  choiceType = 'MCQ';
  subscription!: Subscription;
  other = false;
  dataLoaded = false;
  uid;
  fuid;
  quid;
  formData;
  myQuestionData;
  correctValue!: string;
  opSubscription!: Subscription;
  ifCorrect = '';
  @ViewChild('optionContainer') opContainer!: ElementRef;
  constructor(
    private qblock: QuestionBlockService,
    private activateRoute: ActivatedRoute,
    private firestore: AngularFirestore,
    private injectedQuid: QuidServive
  ) {
    this.quid = injectedQuid.Quid;
    this.uid = this.activateRoute.snapshot.data.uid;
    this.fuid = this.activateRoute.snapshot.url[0].path;
  }

  ngOnInit(): void {
    this.subscription = this.qblock.choiceQuestionType$.subscribe((x) => {
      this.choiceType = x;
    });

    const data = this.firestore
      .doc(`assessments/${this.uid}`)
      .get()
      .pipe(
        take(1),
        map((x) => {
          return x.data();
        })
      );

    data.subscribe((x: any) => {
      if (x[this.fuid]) {
        this.formData = x[this.fuid];
        const _formData = Object.values(x[this.fuid].Questions);
        this.myQuestionData = _.find(_formData, ['Quid', `${this.quid}`]);
        this.correctValue = this.myQuestionData.correct;
        this.correctValue.trim();
        if (!this.dataLoaded) {
          this.dataLoaded = true;
        }
        if (this.myQuestionData.options.length == 1) {
          this.showDelete = false;
        } else {
          this.showDelete = true;
        }
      }
      this.myQuestionData.options.forEach(option => {
        this.checkCorrectness(option.optionValue);
      });
    });
  }
  addOption() {
    this.showDelete = true;
    const defaultOptionValue = this.qblock.getOpDefaultValue();
    console.log(defaultOptionValue);
    const opId = this.qblock.getOpuid();
    const opOrder = this.myQuestionData.options.length + 1;
    this.myQuestionData.options.push({
      optionValue: defaultOptionValue,
      optionId: opId,
      optionOrder: opOrder,
    });
    this.constructNewFormValues();
    this.qblock.pushChanges(this.formData, this.uid, this.fuid);
  }
  constructNewFormValues() {
    this.formData.Questions.forEach((item) => {
      if (item.Quid === this.quid) {
        item = this.myQuestionData;
        return;
      }
    });
  }
  addOther() {
    this.showDelete = false;
    this.other = true;
  }
  show(event){
    event.stopPropagation();
  }
  deleteOption(index: number) {
    const end = index + 1;
    this.myQuestionData.options.splice(index, end);
    this.constructNewFormValues();
    this.qblock.pushChanges(this.formData, this.uid, this.fuid);
    if (this.myQuestionData.options.length == 1) {
      this.showDelete = false;
    } else {
      this.showDelete = true;
    }
  }

  deleteOther(optionRef: HTMLDivElement) {
    if (this.myQuestionData.options.length == 1) {
      this.showDelete = false;
    } else {
      this.showDelete = true;
    }
    optionRef.remove();
    this.other = false;
  }

  checkIfDuplicate(el: HTMLInputElement, opId: string, event) {
    this.optionEmpty = false;
    var proceed = false;
    if (event.target.value.length < 1) {
      this.optionEmpty = true;
    } else {
      this.myQuestionData.options.forEach((option) => {
        if (option.optionId == opId) {
        } else {
          if (
            option.optionValue.toLowerCase() == event.target.value.toLowerCase()
          ) {
            this.hideAddOption = true;
            proceed = false;
            return;
          } else {
            this.hideAddOption = false;
            proceed = true;
            return;
          }
        }
      });
    }
    if (proceed) {
      this.myQuestionData.options.forEach((option) => {
        if (option.optionId == opId) {
          console.log('pushing');
          option.optionValue = event.target.value;
          option.optionValue.trim();
          this.constructNewFormValues();
          this.qblock.pushChanges(this.formData, this.uid, this.fuid);
          return;
        } else {
          return ;
        }
      });
    }
  }

  checkIfEmpty(el: HTMLInputElement) {
    if (el.value == '') {
      el.focus();
      this.optionEmpty = true;
    } else {
      this.optionEmpty = false;
      el.blur();
    }
  }
  checkCorrectness(optionValue){
    console.log('Option value',optionValue);
    console.log('Correct Value',this.correctValue);
    if(optionValue == this.correctValue){
      this.ifCorrect = 'color-green';
    }
    else{
      this.ifCorrect = '';
    }
  }
  onUpdateMeAsCorrect(inputVar: HTMLInputElement) {
    this.qblock.pushChanges(this.formData, this.uid, this.fuid);
    this.checkCorrectness(inputVar.value);
    this.myQuestionData.correct = inputVar.value;
    // inputVar.style.color = 'green';
  }
  identify(index, item) {
    return index;
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
