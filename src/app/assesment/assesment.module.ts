import { FormBuilderModule } from './../form-builder/form-builder.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
  imports: [CommonModule, AssesmentRoutingModule,FormBuilderModule],
})
export class AssesmentModule {}
