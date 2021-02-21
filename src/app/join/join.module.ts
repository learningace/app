import { NgModule } from '@angular/core';

import { AngularFireAuthModule } from '@angular/fire/auth';
import { SharedModule } from './../shared-module/shared.module';
import { JoinRoutingModule } from './join-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [JoinRoutingModule, SharedModule,AngularFireAuthModule],
})
export class JoinModule {}
