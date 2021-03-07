import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-enroll-to-course',
  templateUrl: './enroll-to-course.component.html',
  styleUrls: ['./enroll-to-course.component.css'],
})
export class EnrollToCourseComponent implements OnInit {
  uid;
  courseId;
  courseData;
  constructor(private db: AngularFirestore,private router : Router,
    private activatedRoute:ActivatedRoute) {
    this.courseId = this.router.url.split('/')[2];
    this.uid = this.activatedRoute.snapshot.data.uid;
    console.log(this.courseId);
    console.log(this.uid);
  }

  ngOnInit(): void {
    const email = `sumaiya@gmail.com`;
   const data = {displayName:'mujeeb',uid:'98767'};
    this.db.doc(`CORSE1910101/enrollments`).update({
      [email]:data
    })
    .then(()=>{
      console.log('pushed');
    });

  }
}
