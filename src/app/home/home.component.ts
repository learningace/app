import { SetTitleService } from './../set-title.service';
import { Component } from '@angular/core';
import { MatAnchor } from '@angular/material/button';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  color:string ="white";
  constructor(private title :SetTitleService) { 
    this.title.setTitle("LearningAce | Home ")
  }

  onHover(el : MatAnchor){
    let styles = el._elementRef.nativeElement.style;
    styles.color="white";
    styles.textDecoration="none";
    styles.backgroundColor="darkblue";
  
  }
  onHoverLeave(el : MatAnchor){
    let styles = el._elementRef.nativeElement.style;
    styles.backgroundColor="";
  }
  log(l :HTMLAnchorElement){
    console.log(l);
  }

}
