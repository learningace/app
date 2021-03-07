import { StudentsComponent } from './students/students.component';
import { AssessmentsComponent } from './assessments/assessments.component';
import { LessonsComponent } from './lessons/lessons.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserUidResollver } from '../assesment/services/uid.resolver';
import { CourseViewGuard } from '../guards/course.view.guard';

import { AddCourseComponent } from './add-course/add-course.component';
import { CourseDashboardComponent } from './course-dashboard/course-dashboard.component';
import { CourseHomeComponent } from './course-home/course-home.component';

const routes: Routes = [
  {
    path: 'add',
    component: AddCourseComponent,
    resolve: { uid: UserUidResollver },
  },
  {
    path: ':id',
    component: CourseHomeComponent,
    canActivate: [CourseViewGuard],
    children: [
      {
        path: '',
        component: CourseDashboardComponent,
        resolve: { uid: UserUidResollver },
      },
      {
        path: 'lessons',
        component: LessonsComponent,
        resolve: { uid: UserUidResollver },
      },
      {
        path: 'assessments',
        component: AssessmentsComponent,
        resolve: { uid: UserUidResollver },
      },
      {
        path: 'students',
        component: StudentsComponent,
        resolve: { uid: UserUidResollver },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseRoutingModule { }
