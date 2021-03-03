import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-long-answer',
  templateUrl: './long-answer.component.html',
  styleUrls: ['./long-answer.component.css'],
})
export class LongAnswerComponent implements OnInit {
  constructor() {}
  wordLimit = 0;
  previousVal = '';
  ngOnInit(): void {}

  onWordLimit(event) {
    event.target.value = event.target.value
      .replace(/[^0-9.]/g, '')
      .replace(/(\..*)\./g, '$1');
      this.wordLimit = parseInt(event.target.value);
     console.log(this.wordLimit);
  }
  
  
}
