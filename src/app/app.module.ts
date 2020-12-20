import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon' 
import { MatListModule } from '@angular/material/list' 
import { MatButtonModule } from  '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { LayoutModule } from '@angular/cdk/layout';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { NgxSpinnerModule } from "ngx-spinner";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './join/login/login.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { CourseMaterialComponent } from './courses/course-material/course-material.component';
import { DiscussionForumComponent } from './courses/discussion-forum/discussion-forum.component';
import { CourseAssesmentComponent } from './courses/course-assesment/course-assesment.component';
import { CourseEnrollmentListComponent } from './courses/course-enrollment-list/course-enrollment-list.component';
import { StudentProfileComponent } from './students/student-profile/student-profile.component';
import { CoursesEnrolledInComponent } from './students/courses-enrolled-in/courses-enrolled-in.component';
import { PrivateAreaComponent } from './students/private-area/private-area.component';
import { StudentNotificationsComponent } from './students/student-notifications/student-notifications.component';
import { SignUpComponent } from './join/sign-up/sign-up.component';
import { CourseEventsComponent } from './courses/course-events/course-events.component';
import { CourseNotificationsComponent } from './courses/course-notifications/course-notifications.component';
import { CourseAddNewComponent } from './courses/course-add-new/course-add-new.component';
import { CourseEditComponent } from './courses/course-edit/course-edit.component';
import { TeacherProfileComponent } from './teacher/teacher-profile/teacher-profile.component';
import { CoursesTeachingComponent } from './teacher/courses-teaching/courses-teaching.component';
import { TeacherPrivateAreaComponent } from './teacher/teacher-private-area/teacher-private-area.component';
import { TeacherNotificationsComponent } from './teacher/teacher-notifications/teacher-notifications.component';
import { CourseLecturesComponent } from './courses/course-lectures/course-lectures.component';
import { AddNewLectureComponent } from './courses/course-lectures/add-new-lecture/add-new-lecture.component';
import { EditLectureComponent } from './courses/course-lectures/edit-lecture/edit-lecture.component';
import { SignSuccessComponent } from './join/sign-up/sign-success/sign-success.component';
import { StudentWelcomeScreenComponent } from './students/student-welcome-screen/student-welcome-screen.component';
// import { AuthInterceptorService } from './services/auth-services/auth-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    HomeComponent,
    CourseMaterialComponent,
    DiscussionForumComponent,
    CourseAssesmentComponent,
    CourseEnrollmentListComponent,
    StudentProfileComponent,
    CoursesEnrolledInComponent,
    PrivateAreaComponent,
    StudentNotificationsComponent,
    SignUpComponent,
    CourseEventsComponent,
    CourseNotificationsComponent,
    CourseAddNewComponent,
    CourseEditComponent,
    TeacherProfileComponent,
    CoursesTeachingComponent,
    TeacherPrivateAreaComponent,
    TeacherNotificationsComponent,
    CourseLecturesComponent,
    AddNewLectureComponent,
    EditLectureComponent,
    SignSuccessComponent,
    StudentWelcomeScreenComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatTabsModule,
    MatToolbarModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatRippleModule,
    MatCheckboxModule,
    NgxSpinnerModule,
    LayoutModule,
    MatSidenavModule,
    MatGridListModule,
    MatMenuModule,
    MatTableModule,
    MatSnackBarModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
