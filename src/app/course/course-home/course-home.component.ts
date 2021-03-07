import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SetTitleService } from './../../set-title.service';

@Component({
  selector: 'app-course-home',
  templateUrl: './course-home.component.html',
  styleUrls: ['./course-home.component.css'],
})
export class CourseHomeComponent {
  courseId;
  constructor(
    private title: SetTitleService,
    private activatedRoute : ActivatedRoute
  ) {
    this.courseId = this.activatedRoute.snapshot.url[0].path;
    console.log(this.courseId);
    this.title.setTitle('LearningAce | Course');
  }

}
