import { Component } from '@angular/core';

import * as AOS from 'aos';
import { SetTitleService } from './set-title.service';
import { ConnectionService } from 'ng-connection-service';
import { CommonService } from './shared-module/services/common.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(
    private connectionService: ConnectionService,
    private commonService: CommonService,
   
  ) {
  }

  ngOnInit() {
    AOS.init();
    if (!window.navigator.onLine) {
      this.commonService.snackbarError('You are offline 😕');
    }
    this.connectionService.monitor().subscribe((isConnected) => {
      if (isConnected) {
        this.commonService.snackbarClear();
        this.commonService.snackbarSuccess('Back Online',10000)
      } else {
        this.commonService.snackbarClear();
        this.commonService.snackbarError(
          'You are offline, Please Check your internet connection'
        );
      }
    });
  }
}
