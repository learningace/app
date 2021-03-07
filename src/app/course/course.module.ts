import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseRoutingModule } from './course-routing.module';
import { CourseHomeComponent } from './course-home/course-home.component';
import { AddCourseComponent } from './add-course/add-course.component';
import { CourseDashboardComponent } from './course-dashboard/course-dashboard.component';
import { LessonsComponent } from './lessons/lessons.component';
import { AssessmentsComponent } from './assessments/assessments.component';
import { StudentsComponent } from './students/students.component';


@NgModule({
  declarations: [CourseHomeComponent, AddCourseComponent, CourseDashboardComponent, LessonsComponent, AssessmentsComponent, StudentsComponent],
  imports: [CommonModule, CourseRoutingModule],
})
export class CourseModule {}
