import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";

import { QuicklinkStrategy } from 'ngx-quicklink';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';

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
  // {
  //   path: 'instructor',
  //   loadChildren: () =>
  //     import('./instructor/instructor.module').then((m) => m.InstructorModule),
  // },
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