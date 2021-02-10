import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocsRoutingModule } from './docs-routing.module';
import { SrsComponent } from './srs/srs.component';
import { HomeComponent } from './home/home.component';
import { IntroductionComponent } from './introduction/introduction.component';

@NgModule({
  declarations: [SrsComponent, HomeComponent, IntroductionComponent],
  imports: [
    CommonModule,
    DocsRoutingModule,
    ]
})
export class DocsModule { }
