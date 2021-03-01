import { QuestionBlockComponent } from './Components/question-block/question-block.component';
import { NgModule } from '@angular/core';
import { FormBuilderRoutingModule } from './form-builder-routing.module';

import { SharedModule } from '../shared-module/shared.module';

import { TimeComponent } from './Components/time/time.component';
import { TickboxGridComponent } from './Components/tickbox-grid/tickbox-grid.component';
import { ShortAnswerComponent } from './Components/short-answer/short-answer.component';
import { MultiChoiceGridComponent } from './Components/multi-choice-grid/multi-choice-grid.component';
import { McqComponent } from './Components/mcq/mcq.component';
import { LongAnswerComponent } from './Components/long-answer/long-answer.component';
import { LinearScaleComponent } from './Components/linear-scale/linear-scale.component';
import { FileUploadComponent } from './Components/file-upload/file-upload.component';
import { DropdownComponent } from './Components/dropdown/dropdown.component';
import { DateComponent } from './Components/date/date.component';
import { CheckboxesComponent } from './Components/checkboxes/checkboxes.component';
@NgModule({
  declarations: [
    CheckboxesComponent,
    DateComponent,
    DropdownComponent,
    FileUploadComponent,
    LinearScaleComponent,
    LongAnswerComponent,
    McqComponent,
    MultiChoiceGridComponent,
    ShortAnswerComponent,
    TickboxGridComponent,
    TimeComponent,
    QuestionBlockComponent,
  ],
  imports: [FormBuilderRoutingModule, SharedModule],
  exports: [QuestionBlockComponent],
})
export class FormBuilderModule {}
