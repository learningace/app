import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InstructorDashboardComponent } from './instructor-dashboard/instructor-dashboard.component';
const routes: Routes = [
  { path: '', component: InstructorDashboardComponent },
  {
    path: 'assesment',
    loadChildren: () =>
      import('../assesment/assesment.module').then(
        (m) => m.AssesmentModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstructorRoutingModule { }
