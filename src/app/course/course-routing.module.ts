import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddCourseComponent } from './add-course/add-course.component';
import { CourseHomeComponent } from './course-home/course-home.component';

const routes: Routes = [
  {path:'', component :CourseHomeComponent},
  {path:'add', component:AddCourseComponent}
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseRoutingModule { }
