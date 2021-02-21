import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { QuicklinkModule } from 'ngx-quicklink';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [],
  imports: [CommonModule, FormsModule, QuicklinkModule,AngularFirestoreModule,MatProgressSpinnerModule],
  exports: [CommonModule, FormsModule, QuicklinkModule,AngularFirestoreModule,MatProgressSpinnerModule],
})
export class SharedModule {}
