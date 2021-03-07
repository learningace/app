import { formData } from './../services/question-block.service';
import {
  Component,
  OnInit,
  ComponentFactoryResolver,
  ViewContainerRef,
  ViewChild,
  ComponentRef,
  ViewRef,
  OnDestroy,
  HostListener,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { McqComponent } from './../../form-builder/Components/mcq/mcq.component';
import { LongAnswerComponent } from './../../form-builder/Components/long-answer/long-answer.component';
import { QuestionBlockService } from '../services/question-block.service';
import { QuestionBlockComponent } from './../../form-builder/Components/question-block/question-block.component';
import { AngularFirestore } from '@angular/fire/firestore';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-edit-assesment',
  templateUrl: './edit-assesment.component.html',
  styleUrls: ['./edit-assesment.component.css'],
})
export class EditAssesmentComponent implements OnInit, OnDestroy {
  isSelected = false;
  @ViewChild('QuestionBlockContainer', { read: ViewContainerRef })
  ref!: ViewContainerRef;
  @HostListener('click')
  handleKeyDown(event) {
    this.qblock.hideQuestionBlock();
  }
  componentRef!: ComponentRef<QuestionBlockComponent>;
  viewRef!: ViewRef;
  formData: any = true;
  questions;
  metadata;
  uid;
  fid;
  dataLoaded = false;
  formDataSubscription!: Subscription;
  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    public qblock: QuestionBlockService,
    private firestore: AngularFirestore,
    private router: ActivatedRoute,
    private route: Router
  ) {
    this.uid = this.router.snapshot.data.uid;
    this.fid = this.router.snapshot.url[0].path;
  }

  ngOnInit(): void {
    this.formDataSubscription = this.firestore
      .doc(`assessments/${this.uid}`)
      .valueChanges()
      .pipe(take(1))
      .subscribe((x: any) => {
        if (x) {
          if (x[this.fid]) {
            const formData = x[this.fid];
            this.formData = JSON.stringify(formData);
            this.questions = formData.Questions;
            this.metadata = formData.metadata[0];
            this.dataLoaded = true;
            this.ref.clear();
            this.questions.forEach((item, index) => {
              this.loadQuestion(item, index);
            });
          } else {
            this.ref.clear();
            this.dataLoaded = false;
            this.formData = null;
          }
        } else {
          this.ref.clear();
          this.dataLoaded = false;
          this.formData = null;
        }
      });
  }
  OnInputFocus(element: HTMLInputElement) {
    element.select();
    this.isSelected = true;
  }
  AddQuestion() {
    var new_data = this.qblock.newQuestion(this.formData, this.uid, this.fid);
    const new_quid = new_data.newQuid;
    new_data.Questions.forEach((item, index) => {
      if (item.Quid === new_quid) this.loadQuestion(item, index);
      return;
    });
    delete new_data.newQuid;
    this.formData = new_data;
    console.log(this.formData);
  }

  loadQuestion(item, index) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      QuestionBlockComponent
    );
    this.componentRef = this.ref.createComponent(componentFactory);
    this.qblock.updateViewContainerRef(this.ref);
    this.viewRef = this.componentRef.hostView;
    this.componentRef.instance.myindex = this.ref.indexOf(this.viewRef);
    this.componentRef.instance.componentOutlet = this.checkComponent(item.type);
    this.componentRef.instance.myType = item.type;
    this.componentRef.instance.myTitle = item.title;
    this.componentRef.instance.myDescription = item.descriptoin;
    this.componentRef.instance.myOrder = item.order;
    this.componentRef.instance.myQuid = item.Quid;
    this.componentRef.instance.myPoints = item.points;
    this.componentRef.instance.isRequired = item.required;
    this.componentRef.instance.myQindex = index;
    this.componentRef.instance.fuid = this.fid;
    this.componentRef.instance.uid = this.uid;
    if (item.type === 'MCQ' || item.type === 'CHK' || item.type === 'DRD') {
      this.componentRef.instance.myOptions = item.options;
    } else {
      this.componentRef.instance.myOptions = null;
    }
    if (item.type === 'LA') {
      this.componentRef.instance.myWordLimit = item.wordLimit;
    } else {
      this.componentRef.instance.myWordLimit = null;
    }
    this.componentRef.instance.myView = this.viewRef;
  }
  checkComponent(type) {
    switch (type) {
      case 'MCQ':
        return McqComponent;
      case 'LA':
        return LongAnswerComponent;
      default:
        return McqComponent;
    }
  }
  onFocusLeave() {
    this.isSelected = false;
  }

  move() {
    this.ref.move(this.viewRef, 0);
  }
  onTakeMeBack() {
    this.route.navigate(['instructor/assesment']);
  }
  ngOnDestroy() {
    this.formDataSubscription.unsubscribe();
  }
}
