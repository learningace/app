import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { StudentProfileComponent } from './students/student-profile/student-profile.component';
import { SignSuccessComponent } from './join/sign-up/sign-success/sign-success.component';
import { LoginComponent } from './join/login/login.component';
import { SignUpComponent } from './join/sign-up/sign-up.component';

const routes: Routes = [
  {path : '', component : HomeComponent, pathMatch:'full'},
  {path : 'login', component : LoginComponent},
  {path : 'signup', component : SignUpComponent},
  {path : 'student/view/profile', component : StudentProfileComponent},
  {path : 'signup/success/welcome', component : SignSuccessComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
