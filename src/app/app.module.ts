import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { AngularFireModule } from '@angular/fire'; 
import { environment } from './../environments/environment';

import { QuicklinkModule } from 'ngx-quicklink';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { SnackbarModule } from 'ngx-snackbar';
@NgModule({
  declarations: [AppComponent, NotFoundComponent, HomeComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    LoadingBarRouterModule,
    LoadingBarHttpClientModule,
    QuicklinkModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    SnackbarModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
