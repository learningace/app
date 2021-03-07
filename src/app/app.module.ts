import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
import { NgxSpinnerModule } from 'ngx-spinner';
import { EnrollToCourseComponent } from './enroll-to-course/enroll-to-course.component';
@NgModule({
  declarations: [AppComponent, NotFoundComponent, HomeComponent, EnrollToCourseComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LoadingBarRouterModule,
    LoadingBarHttpClientModule,
    QuicklinkModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    SnackbarModule.forRoot(),
    NgxSpinnerModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
