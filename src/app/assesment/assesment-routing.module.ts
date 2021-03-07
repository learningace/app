import { EditAssesmentComponent } from './edit-assesment/edit-assesment.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateAssesmentComponent } from './create-assesment/create-assesment.component';
import { AssesmentDashboardComponent } from './assesment-dashboard/assesment-dashboard.component';
import { UserUidResollver } from './services/uid.resolver';

const routes: Routes = [
  {
    path: '',
    component: AssesmentDashboardComponent,
    resolve: { uid: UserUidResollver },
  },
  { path: 'create', component: CreateAssesmentComponent },
  {
    path: ':id/edit',
    component: EditAssesmentComponent,
    resolve: { uid: UserUidResollver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssesmentRoutingModule {}
