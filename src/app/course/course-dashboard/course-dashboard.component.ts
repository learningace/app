import { take } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { CourseService } from './../services/course.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-course-dashboard',
  templateUrl: './course-dashboard.component.html',
  styleUrls: ['./course-dashboard.component.css']
})
export class CourseDashboardComponent implements OnInit {
  courseId;
  courseData;
  constructor(private activatedRoute : ActivatedRoute,
    private courseService : CourseService) 
  { 
    this.courseId = this.activatedRoute.snapshot.params.id;
   // this.courseService.getAllLearners().subscribe((data)=>{
      // let _users:any[] 
      // data.forEach((data)=>{
      //   _users.push(data.data());
      // });
      // const users = data.find((data)=>{
      //   const userData:any = data.data();
      //   if(userData.default_role == 'LEARNER'){
      //     return userData;
      //   }
      // });
      //console.log(data);
    //});
    
  }

  ngOnInit(): void {
    this.courseService.getCourseDetails(this.courseId)
    .pipe(take(1))
    .subscribe((data)=>{
      this.courseData = data;
      console.log(this.courseData);
    });
  }

}
