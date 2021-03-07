import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { take, map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({ providedIn: 'root' })
export class CourseService {
  constructor(private db: AngularFirestore,private router : Router) {}

  getCourseId() {
    const _time = Date.now().toString();
    return 'COURSE' + _time;
  }

  getLessonId() {
    const _time = Date.now().toString();
    return 'LESSON' + _time;
  }

  createCourse(courseId: string, courseName = 'Untitled Course', uid: string) {
    const _time = Date.now().toString();
    const emptyLesson: any = [];
    const emptyAssessments: any = [];
    const noEnrollments: any = [];
    this.db
      .doc(`courses/${courseId}`)
      .set({
        courseName: courseName,
        createdAt: _time,
        createdBy: uid,
        lessons: emptyLesson,
        assessments: emptyAssessments,
        enrollments: noEnrollments,
      })
      .then(() => {
        console.log('Collection Successfully');
        this.db
          .doc(`users/${uid}`)
          .get()
          .pipe(take(1))
          .subscribe((userData) => {
            if (userData) {
              const data: any = userData.data();
              const courses = data.courses;
              courses.push({ courseId: courseId, courseName: courseName });
              this.db
                .doc(`users/${uid}`)
                .update({
                  courses: courses,
                })
                .then(() => {
                    this.router.navigate(['instructor/course/',courseId]);                  
                });
            }
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  deleteCourse(courseId, uid) {
    this.db
      .doc(`courses/${courseId}`)
      .delete()
      .then(() => {
        this.db
          .doc(`users/${uid}`)
          .get()
          .pipe(take(1))
          .subscribe((userData) => {
            if (userData) {
              const data: any = userData.data();
              const courses = data.courses;
              console.log(courses);
              let course = courses.find((course) => {
                if (course.courseId === courseId) {
                  return course;
                }
              });
              let index = courses.indexOf(course);
              courses.splice(index, index + 1);
              this.db
                .doc(`users/${uid}`)
                .update({
                  courses: courses,
                })
                .then(() => {
                  console.log('Created Successfully');
                });
            }
          });
      });
  }

  updateCourseName(courseId, newCourseName) {
    this.db
      .doc(`courses/${courseId}`)
      .update({
        courseName: newCourseName,
      })
      .then(() => {});
  }

  addaLesson(
    courseId,
    newLesson: { lessonId: string; lessonName: string; lessonData: string }
  ) {
    this.getAllLessons(courseId)
      .pipe(take(1))
      .subscribe((lessons) => {
        if (lessons) {
          lessons.push(newLesson);
          this.db
            .doc(`courses/${courseId}`)
            .update({
              lessons: lessons,
            })
            .then(() => {});
        }
      });
  }

  getAllLessons(courseId) {
    return this.db
      .doc(`courses/${courseId}`)
      .valueChanges()
      .pipe(
        take(1),
        map((x) => {
          const courseData: any = x;
          return courseData.lessons;
        })
      );
  }

  getAllCourses(uid) {
    return this.db
      .doc(`users/${uid}`)
      .get()
      .pipe(
        take(1),
        map((x) => {
          const data = x.data();
          return data;
        })
      );
  }
   getCourseDetails(courseId:string){
       return this.db
         .doc(`courses/${courseId}`)
         .get()
         .pipe(
           take(1),
           map((x) => {
             const data = x.data();
             return data;
           })
         );
   }

   getAllLearners(){
        return this.db.collection('users').get()
        .pipe(take(1),
        map(x=>{
            var arr:any[]=[];
           x.docs.forEach((docs)=>{
                 arr.push(docs.data());
           });
           return arr;
       }));

   }

   enrollStudent(courseId:string,uid:string,email,displayName){
    this.getCourseDetails(courseId)
    .subscribe((course:any)=>{
        console.log(course);
        var courseName = course.courseName;
        if(course){
            var enrollments = course.enrollments;
            enrollments.push({
                uid:uid,
                email:email,
                displayName:displayName
            });
            this.db.doc(`courses/${courseId}`).update({
                enrollments : enrollments
            })
            .then(()=>{
                this.db.doc(`users/${uid}`).get()
                .pipe(take(1))
                .subscribe((data:any)=>{
                    const _data = data.data();
                    var courses = _data.courses;
                    courses.push({
                        courseId:courseId,
                        courseName:courseName
                    });
                    this.db.doc(`users/${uid}`).update({
                        courses:courses
                    });
                });
            });
        }
    }); 

   }
}
