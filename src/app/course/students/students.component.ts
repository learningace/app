import { Component, OnInit } from '@angular/core';
import { CourseService } from './../services/course.service';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],
})
export class StudentsComponent implements OnInit {
  unenrolled:any[] = [];
  enrolled:any[]=[];
  dataLoaded=false;
  courseId;
  constructor(private courseService: CourseService,
    private activatedRoute:ActivatedRoute,
    private router: Router) {}

  ngOnInit(): void {
    this.courseId = this.router.url.split('/')[3];
    this.getStudentList();
  }

  onEnroll(uid:string,email,displayName){
    console.log(uid);
    this.courseService.enrollStudent(this.courseId,uid,email,displayName);
    this.getStudentList();
  }

  getStudentList(){
    this.courseService.getAllLearners().subscribe((data) => {
      const learners: any[] = [];
      data.find((user) => {
        if (user.default_role == 'LEARNER') {
          learners.push(user);
        }
      });
      learners.forEach((student) => {
          if (student.courses.toString() == '') {
            this.unenrolled.push(student);
          }
      });
      this.unenrolled
      learners.forEach((student) => {
        if (student.courses.toString() != '') {
          if (student.courses.courseId == this.courseId) {
            this.enrolled.push(student);
          }
        }
      });
      this.dataLoaded = true;
    });
  }
}
