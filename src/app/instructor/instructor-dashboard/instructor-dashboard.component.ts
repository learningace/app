import { CourseService } from './../../course/services/course.service';
import { QuestionBlockService } from 'src/app/assesment/services/question-block.service';
import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { AuthenticationService } from './../../join/authentication.service';
import { SnackbarService } from 'ngx-snackbar';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-instructor-dashboard',
  templateUrl: './instructor-dashboard.component.html',
  styleUrls: ['./instructor-dashboard.component.css'],
})
export class InstructorDashboardComponent implements OnInit {
  isEmailVerified = true;
  dataLoaded = false;
  uid;
  data;
  constructor(
    private auth: AuthenticationService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private snackbar: SnackbarService,
    private qBlock: QuestionBlockService,
    private courseService: CourseService
  ) {}

  ngOnInit(): void {
    this.auth.user$.pipe(take(1)).subscribe((user) => {
      if (user) {
        if (user.emailVerified == false) {
          this.isEmailVerified = false;
        }
      }
    });
    this.uid = this.activatedRoute.snapshot.data.uid;
    this.courseService
      .getAllCourses(this.uid)
      .pipe(take(1))
      .subscribe((data) => {
        this.data = data;
        this.dataLoaded = true;
      });
  }

  signOut() {
    this.auth.logout();
  }

  onAssesment() {
    this.router.navigate(['/instructor/assesment']);
  }
  generate() {
    this.qBlock.getOpDefaultValue();
  }
  onCreateCourse() {
    this.router.navigate(['instructor/course/add']);
  }
  onCourseEdit(courseId,event){
    event.stopPropagation();
    this.router.navigate([`instructor/course/${courseId}`]);
  }
  onDeleteCourse(courseId, courseRef: HTMLDivElement, courseName, event) {
    event.stopPropagation();
    const confrm = window.confirm(
      `Do You wanna delete "${courseName}" course ?`
    );
    if (confrm) {
      this.courseService.deleteCourse(courseId, this.uid);
      courseRef.remove();
    } else {
      return;
    }
  }
}
