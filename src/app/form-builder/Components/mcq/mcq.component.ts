import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { QuestionBlockService } from 'src/app/assesment/services/question-block.service';

@Component({
  selector: 'app-mcq',
  templateUrl: './mcq.component.html',
  styleUrls: ['./mcq.component.css'],
})
export class McqComponent implements OnInit, OnDestroy {
  options = [1];
  optionNuber = 1;
  hideDelete = true;
  choiceType = 'MCQ';
  subscription!: Subscription;
  other = false;
  @ViewChild('optionContainer') opContainer!: ElementRef;
  constructor(private qblock: QuestionBlockService) {}

  ngOnInit(): void {
    this.subscription = this.qblock.choiceQuestionType$.subscribe((x) => {
      this.choiceType = x;
    });
  }
  addOption() {
    this.options.push(1);
    this.optionNuber++;
    this.hideDelete = false;
    console.log(this.opContainer.nativeElement.children);
  }
  addOther() {
    this.optionNuber++;
    this.hideDelete = false;
    this.other = true;
  }
  deleteOption(optionRef: HTMLDivElement) {
    this.optionNuber--;
    if (this.optionNuber == 1) {
      this.hideDelete = true;
    } else {
      this.hideDelete = false;
    }
    optionRef.remove();
  }

  deleteOther(optionRef: HTMLDivElement) {
    this.optionNuber--;
    if (this.optionNuber == 1) {
      this.hideDelete = true;
    } else {
      this.hideDelete = false;
    }
    optionRef.remove();
    this.other=false;
  }

  trackByFn(index, item) {
    return index; // or item.id
  }

  checkIfEmpty(el: HTMLInputElement) {
    if (!el.value) {
      el.value = 'Option';
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
