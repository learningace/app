import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { UnsplashPhotoService } from './../../shared-module/services/unsplash-photo.service';

import { MatDialog } from '@angular/material/dialog';
import { UnsplashToolbarComponent } from './../../shared-module/unsplash-toolbar/unsplash-toolbar.component';
import { SetTitleService } from './../../set-title.service';

@Component({
  selector: 'app-course-home',
  templateUrl: './course-home.component.html',
  styleUrls: ['./course-home.component.css'],
})
export class CourseHomeComponent {
  constructor(
    private title: SetTitleService,
    private firestore: AngularFirestore,
    private unsplash: UnsplashPhotoService,
    public dialog: MatDialog
  ) {
    this.title.setTitle('LearningAce | Course');
  }

  openDialog() {
    const dialogRef = this.dialog.open(UnsplashToolbarComponent,{
      hasBackdrop :true
    });
     dialogRef.afterClosed().subscribe((result) => {
       console.log(`Dialog result: ${result}`);
     });
  }
}
