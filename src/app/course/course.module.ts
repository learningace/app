import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseRoutingModule } from './course-routing.module';
import { CourseHomeComponent } from './course-home/course-home.component';
import { AddCourseComponent } from './add-course/add-course.component';


@NgModule({
  declarations: [CourseHomeComponent, AddCourseComponent],
  imports: [CommonModule, CourseRoutingModule],
})
export class CourseModule {}
