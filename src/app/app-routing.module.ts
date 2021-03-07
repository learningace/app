import { UserUidResollver } from './assesment/services/uid.resolver';
import { EnrollToCourseComponent } from './enroll-to-course/enroll-to-course.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";

import { InstructorLoadGuard } from './guards/instructor.canload.guard';
import { LearnerLoadGuard } from './guards/learner.canload.guard';
import { PreventUnauthorizedGuard } from './guards/prevent.unauthorized.guard';
import { QuicklinkStrategy } from 'ngx-quicklink';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { UnauthorizedGuard } from './guards/unauthorized.guard';

const routes: Routes = [
  // {
  //   path: 'docs',
  //   loadChildren: () => import('./docs/docs.module').then((m) => m.DocsModule),
  // },
  {
    path: 'join',
    loadChildren: () => import('./join/join.module').then((m) => m.JoinModule),
  },
  // {
  //   path: 'lecture',
  //   loadChildren: () =>
  //     import('./lecture/lecture.module').then((m) => m.LectureModule),
  // },
  // {
  //   path: 'course',
  //   loadChildren: () =>
  //     import('./course/course.module').then((m) => m.CourseModule),
  // },
  {
    path: 'instructor',
    loadChildren: () =>
      import('./instructor/instructor.module').then((m) => m.InstructorModule),
    canLoad: [PreventUnauthorizedGuard, InstructorLoadGuard],
  },
  {
    path: 'learner',
    loadChildren: () =>
      import('./learner/learner.module').then((m) => m.LearnerModule),
    canLoad: [PreventUnauthorizedGuard, LearnerLoadGuard],
  },
  {
    path: 'assessment',
    loadChildren: () =>
      import('./assessment-view/assessment-view.module').then(
        (m) => m.AssessmentViewModule
      ),
  },
  {
    path: 'enroll/:id',
    component: EnrollToCourseComponent,
    canActivate: [UnauthorizedGuard],
    resolve: { uid: UserUidResollver },
  },
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: QuicklinkStrategy }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}