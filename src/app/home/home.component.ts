import { Component } from '@angular/core';

import { environment } from './../../environments/environment';
import { SetTitleService } from './../set-title.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  assestUrl = '';
  tabContent = ``;
  isSelected = 0;
  constructor(private title: SetTitleService) {
    this.assestUrl = environment.assetsUrl;
    this.title.setTitle('LearningAce | Home ');
  }

  ngOnInit() {
    this.onOpenTab(1);
  }

  onOpenTab(tabNumber: number) {
    this.isSelected = tabNumber;
    switch (tabNumber) {
      case 1:
        this.tabContent = `A teacher can monitor all activities pertaining to their assigned students within his dashboard. 
          There is a dedicated window for a teacher to view the progress of all students enrolled within a course, identify the students lagging behind and assist them to enhance their performance. 
          A one-stop window to all the upcoming assignments, submitted assessments and all other messages – all laid out is a simplified and easy to understand view.
          <p>The dashboard provides following view for the teacher</p>
          <ul>
            <li class="list-item align-left">View student progress</li>
            <li class="list-item align-left">Send messages to students</li>
            <li class="list-item align-left">View all assigned course and its syllabus</li>
            <li class="list-item align-left">Create lesson plans</li>
            <li class="list-item align-left">Mark student attendance (if desired for an online class)</li>
            <li class="list-item align-left">Create question banks and quizzes</li>
            <li class="list-item align-left">Plan assessments for students</li>
            <li class="list-item align-left">Personalized calendars with reminders</li>
            <li class="list-item align-left">Personal Briefcase – Upload reference documents for self-consumption</li>
            <li class="list-item align-left">Create and participate in blogs &amp; forums</li>
            <li class="list-item align-left">View student reports</li>
            <li class="list-item align-left">Broadcast notification to students</li>
          </ul>`;
        break;
      case 2:
        this.tabContent = `<p>A Dashboard is provided to each student highlighting the individuals’ progress across all the courses in which the student is enrolled. 
        This empowers the student to track and analyze his/her performance and identify the problem areas and work on the same with assistance of the respective teacher. 
        Besides the progress, student is displayed a list of upcoming / pending / submitted assignments / assessments etc.</p>
        <p>The dashboard provides following view for a student</p>
        <ul>
          <li class="list-item align-left">Student profile including photos, description etc.</li>
          <li class="list-item align-left">View courses and content</li>
          <li class="list-item align-left">View progress across all enrolled courses</li>
          <li class="list-item align-left">Targeted announcements</li>
          <li class="list-item align-left">A section dedicated for all assignments with alerts for overdue items</li>
          <li class="list-item align-left">Student directory for viewing and communicating with all the participants &amp; teachers</li>
          <li class="list-item align-left">Discussion board</li>
          <li class="list-item align-left">Chat with all participants online (if permitted by administrator)</li>
          <li class="list-item align-left">Participate in online class</li>
          <li class="list-item align-left">Participate in blogs &amp; forums</li>
          <li class="list-item align-left">Personalized calendar</li>
          <li class="list-item align-left">Institute news</li>
        </ul>`;
        break;
    }
  }
}
