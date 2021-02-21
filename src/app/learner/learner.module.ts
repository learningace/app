import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LearnerRoutingModule } from './learner-routing.module';
import { LearnerDashboardComponent } from './learner-dashboard/learner-dashboard.component';


@NgModule({
  declarations: [LearnerDashboardComponent],
  imports: [
    CommonModule,
    LearnerRoutingModule
  ]
})
export class LearnerModule { }
