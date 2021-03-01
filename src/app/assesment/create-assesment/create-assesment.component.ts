import {
  Component,
  OnInit,
  ComponentFactoryResolver,
  ViewContainerRef,
  ViewChild,
  ComponentRef,
  ViewRef
} from '@angular/core';
import { QuestionBlockService } from '../services/question-block.service';
import { QuestionBlockComponent } from './../../form-builder/Components/question-block/question-block.component';

@Component({
  selector: 'app-create-assesment',
  templateUrl: './create-assesment.component.html',
  styleUrls: ['./create-assesment.component.css'],
})
export class CreateAssesmentComponent implements OnInit {
  isSelected = false;
  @ViewChild('QuestionBlockContainer', { read: ViewContainerRef })
  ref!: ViewContainerRef;
  componentRef!:ComponentRef<QuestionBlockComponent>;
  viewRef!:ViewRef;
  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    public qblock : QuestionBlockService
  ) {}

  ngOnInit(): void {}
  OnInputFocus(element: HTMLInputElement) {
    element.select();
    this.isSelected = true;
  }
  AddQuestion() {
    
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      QuestionBlockComponent
    );
    this.componentRef = this.ref.createComponent(componentFactory);
    this.qblock.updateViewContainerRef(this.ref);
    this.viewRef = this.componentRef.hostView;
    this.componentRef.instance.myindex = this.ref.indexOf(this.viewRef);
    this.componentRef.instance.myView = this.viewRef;
  }
  onFocusLeave(){
    this.isSelected = false;
  }

  move(){
    this.ref.move(this.viewRef,0);
  }
}
