import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LectureRoutingModule } from './lecture-routing.module';
import { CreateLectureComponent } from './create-lecture/create-lecture.component';


@NgModule({
  declarations: [CreateLectureComponent],
  imports: [CommonModule, LectureRoutingModule],
})
export class LectureModule {}
