import { Injectable } from '@angular/core';
import { SnackbarService } from 'ngx-snackbar';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor(private snackbar: SnackbarService) {}

  snackbarError(message: string, timeout?: number) {
    if (timeout) {
      this.snackbar.add({
        msg: message,
        background: '#ffcccb',
        color: 'red',
        timeout: timeout,
        action: {
          text: 'Close',
          color: 'red',
        },
      });
    } else {
      this.snackbar.add({
        msg: message,
        background: '#ffcccb',
        color: 'red',
        action: {
          text: 'Close',
          color: 'red',
        },
      });
    }
  }

  snackbarSuccess(message: string, timeout: number) {
    if (timeout) {
      this.snackbar.add({
        msg: message,
        background: '#4BB543',
        color: 'white',
        timeout: timeout,
        action: {
          text: 'Close',
          color: 'white',
        },
      });
    } else {
      this.snackbar.add({
        msg: message,
        background: '#4BB543',
        color: 'white',
        action: {
          text: 'Close',
          color: 'white',
        },
      });
    }
  }

  snackbarClear(){
    this.snackbar.clear();
  }
}
