import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IntroductionComponent } from './introduction/introduction.component';
import { HomeComponent } from './home/home.component';
import { SrsComponent } from './srs/srs.component';

const routes: Routes = [
  {path : '', component : HomeComponent,
    children : [
    { path :'', component: IntroductionComponent},
    {path : 'srs', component:SrsComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocsRoutingModule { }
