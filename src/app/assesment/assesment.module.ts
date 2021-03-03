import { NgModule } from '@angular/core';


import { SharedModule } from './../shared-module/shared.module';
import { FormBuilderModule } from './../form-builder/form-builder.module';
import { AssesmentRoutingModule } from './assesment-routing.module';
import { AssesmentDashboardComponent } from './assesment-dashboard/assesment-dashboard.component';
import { CreateAssesmentComponent } from './create-assesment/create-assesment.component';
import { EditAssesmentComponent } from './edit-assesment/edit-assesment.component';

@NgModule({
  declarations: [
    AssesmentDashboardComponent,
    CreateAssesmentComponent,
    EditAssesmentComponent,
  ],
  imports: [SharedModule, AssesmentRoutingModule, FormBuilderModule],
})
export class AssesmentModule {}
