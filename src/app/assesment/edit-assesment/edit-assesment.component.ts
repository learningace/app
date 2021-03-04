import { take } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
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
import { McqComponent } from './../../form-builder/Components/mcq/mcq.component';
import { LongAnswerComponent } from './../../form-builder/Components/long-answer/long-answer.component';
import { QuestionBlockService } from '../services/question-block.service';
import { QuestionBlockComponent } from './../../form-builder/Components/question-block/question-block.component';
import { AngularFirestore } from '@angular/fire/firestore';

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
  formData;
  questions;
  metadata;
  uid;
  fid;
  dataLoaded = false;
  uidSubscription!: Subscription;
  formDataSubscription!: Subscription;
  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    public qblock: QuestionBlockService,
    private firestore: AngularFirestore,
    private router: ActivatedRoute
  ) {
    this.uid = this.router.snapshot.data.uid;
    this.fid = this.router.snapshot.url[0].path;
  }

  ngOnInit(): void {
    this.formDataSubscription = this.firestore
      .doc(`assessments/${this.uid}`)
      .valueChanges()
      .subscribe((x: any) => {
        const formData = x[this.fid];
        this.formData = JSON.stringify(formData);
        this.questions = formData.Questions;
        this.metadata = formData.metadata[0];
        this.dataLoaded = true;
        this.ref.clear();
        this.questions.forEach((item) => {
          this.loadQuestion(item);
        });
      });
  }
  OnInputFocus(element: HTMLInputElement) {
    element.select();
    this.isSelected = true;
  }
  AddQuestion() {
    this.qblock.newQuestion(this.formData,this.uid,this.fid);
    // const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
    //   QuestionBlockComponent
    // );
    // this.componentRef = this.ref.createComponent(componentFactory);
    // this.qblock.updateViewContainerRef(this.ref);
    // this.viewRef = this.componentRef.hostView;
    // this.componentRef.instance.myindex = this.ref.indexOf(this.viewRef);
    // this.componentRef.instance.componentOutlet = McqComponent;
    // this.componentRef.instance.myView = this.viewRef;

  }
  loadQuestion(item) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      QuestionBlockComponent
    );
    this.componentRef = this.ref.createComponent(componentFactory);
    this.qblock.updateViewContainerRef(this.ref);
    this.viewRef = this.componentRef.hostView;
    this.componentRef.instance.myindex = this.ref.indexOf(this.viewRef);
    this.componentRef.instance.componentOutlet = this.checkComponent(item.type);
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

  ngOnDestroy() {
    this.uidSubscription.unsubscribe();
    this.formDataSubscription.unsubscribe();
  }
}
