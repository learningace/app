import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { SetTitleService } from './../../set-title.service';
interface course{
  type:string; 
  name: string; 
  category:string;
  categoryId:number;
}
@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css'],
})
export class AddCourseComponent implements OnDestroy {
  nameLeftLength = 60;
  nameMaxLength = 60;
  courseProperty: course = {
    type: '',
    name: '',
    category: '',
    categoryId : 0
  };
  stepsConfig = {
    1: {
      showHeader: false,
      valid: false,
    },
    2: {
      showHeader: true,
      valid: false,
    },
    3: {
      showHeader: false,
      valid: false,
    },
  };
  currentStep = 1;
  maxStep = 3;
  constructor(private title: SetTitleService, private route: Router) {
    this.title.setTitle('LearningAce | Add a course');
    if (sessionStorage.getItem('step')) {
      
      this.currentStep = +(sessionStorage.getItem('step') || '');
      this.courseProperty.type = sessionStorage.getItem('type') || '';
      this.courseProperty.name = sessionStorage.getItem('name') || '';
      this.courseProperty.category = sessionStorage.getItem('category') || '';
      this.nameLeftLength =
        this.nameMaxLength - this.courseProperty.name.length;
      this.courseProperty.categoryId = +(sessionStorage.getItem('categoryId') || '');
    }
  }
  addCourseProperty(value: any, to: string) {
    switch (to) {
      case 'type':
        this.courseProperty.type = value;
        sessionStorage.setItem('type', value);
        break;
      case 'name':
        this.courseProperty.name = value.value;
        this.nameLeftLength =
          this.nameMaxLength - this.courseProperty.name.length;
        sessionStorage.setItem('name', value.value);
        break;
      case 'description':
        this.courseProperty.name = value.target.value;
        sessionStorage.setItem('description', value.target.value);
        break;
      case 'CATEGORY':
        this.courseProperty.category = this.categoriesMap(
          parseInt(value.target.value)
        );
        this.courseProperty.categoryId = value.target.value;
        sessionStorage.setItem('category', this.courseProperty.category);
        sessionStorage.setItem('categoryId', this.courseProperty.categoryId.toString());
        break;
    }
  }

  nextStep() {
    this.currentStep++;
    sessionStorage.setItem('step', this.currentStep.toString());
  }
  backStep() {
    this.currentStep--;
    sessionStorage.setItem('step', this.currentStep.toString());
  }
  createCourse() {
    this.route.navigate(['/lecture']);
  }

  checkValidation() {
    switch (this.currentStep) {
      case 1:
        if (this.courseProperty.type == '') {
          return false;
        } else {
          return true;
        }
      case 2:
        if (this.courseProperty.name == '') {
          return false;
        } else {
          return true;
        }
      case 3:
        if (this.courseProperty.category == '') {
          return false;
        } else {
          return true;
        }
    }
    return false;
  }

  getValidationMsg() {
    switch (this.currentStep) {
      case 1:
        if (this.courseProperty.type == '') {
          return 'Select a course type first to proceed further';
        }
        break;
      case 2:
        if (this.courseProperty.name.length == 0) {
          return 'Please a name for course';
        }
        break;
      case 3:
        if (this.courseProperty.category == '') {
          return 'Please choose a category';
        }
    }
    return 'Click to proceed';
  }

  categoriesMap(id: number) {
    switch (id) {
      case 0:
        return '';
      case 1:
        return 'Math';
      case 2:
        return 'Science';
      case 3:
        return 'Physics';
      case 4:
        return 'Chemistry';
      case 5:
        return 'Biology';
      case 6:
        return 'History';
      case 7:
        return 'Business and management';
      case 8:
        return 'IT and Computer Science';
      case 9:
        return 'Literature';
      case 10:
        return 'Language';
      case 11:
        return 'Law';
      case 12:
        return 'Psychology';
      case 13:
        return 'Creative arts and media';
      case 14:
        return 'Healthcare and medicine';
      case 15:
        return 'Design';
    }
    return '';
  }
  ngOnDestroy() {
    sessionStorage.clear();
    console.log('destroying');
  }
}
