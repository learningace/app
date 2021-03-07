import { CourseService } from './../services/course.service';
import { Component, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { SetTitleService } from './../../set-title.service';
interface course{
  type:string; 
  name: string; 
  category:string;
  categoryId:number;
}
@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css'],
})
export class AddCourseComponent {
  uid;
  constructor(private router: Router, 
    private activatedRoute: ActivatedRoute,
    private courseServie : CourseService) {
    this.uid = this.activatedRoute.snapshot.data.uid;
    console.log(this.uid);
  }
  onTakeMeBack() {
    this.router.navigate(['instructor']);
  }
  onCreateCourse(inputRef: HTMLInputElement){
    const courseName = inputRef.value;
    const courseId = this.courseServie.getCourseId();
    this.courseServie.createCourse(courseId,courseName,this.uid);
  }
}
