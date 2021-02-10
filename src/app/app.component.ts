import { Component } from '@angular/core';

import * as AOS from 'aos';
import { SetTitleService } from './set-title.service';
import { ConnectionService } from 'ng-connection-service';
import { SnackbarService } from 'ngx-snackbar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(
    private title: SetTitleService,
    private connectionService: ConnectionService,
    private snackbar: SnackbarService
  ) {
    this.title.setTitle('LearningAce | Home ');
    
  }

  ngOnInit() {
    AOS.init();
    this.connectionService.monitor().subscribe((isConnected) => {
      if (isConnected) {
        this.snackbar.clear();
        this.snackbar.add({
          msg: 'Back Online',
          background: 'palegreen',
          color: 'black',
          action: {
            text: 'Close',
            color: 'black',
          },
        });
      } else {
        this.snackbar.clear();
        this.snackbar.add({
          msg: 'You are offline, Please Check your internet connection',
          background: ' palevioletred',
          action: {
            text: 'Close',
            color: 'red',
          },
        });
      }
    });
  }
}
