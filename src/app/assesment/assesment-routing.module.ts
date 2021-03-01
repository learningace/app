import { EditAssesmentComponent } from './edit-assesment/edit-assesment.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateAssesmentComponent } from './create-assesment/create-assesment.component';
import { AssesmentDashboardComponent } from './assesment-dashboard/assesment-dashboard.component';

const routes: Routes = [
  {path:'',component:AssesmentDashboardComponent},
  {path:'create', component:CreateAssesmentComponent},
  {path:'edit',component:EditAssesmentComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssesmentRoutingModule { }
