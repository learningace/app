export interface AppUser {
  email: string;
  default_role:string;
  uid:string;
  courses:[{
    courseId:string;
    courseName:string;
  }];
}
