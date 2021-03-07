import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserUidResollver } from '../assesment/services/uid.resolver';
import { InstructorDashboardComponent } from './instructor-dashboard/instructor-dashboard.component';
const routes: Routes = [
  { path: '', component: InstructorDashboardComponent, resolve:{uid : UserUidResollver} },
  {
    path: 'assesment',
    loadChildren: () =>
      import('../assesment/assesment.module').then((m) => m.AssesmentModule),
  },
  {
    path: 'course',
    loadChildren: () =>
      import('./../course/course.module').then((m) => m.CourseModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InstructorRoutingModule {}
