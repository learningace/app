import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { QuicklinkModule } from 'ngx-quicklink';

@NgModule({
  declarations: [],
  imports: [CommonModule, FormsModule, QuicklinkModule],
  exports: [CommonModule, FormsModule, QuicklinkModule],
})
export class SharedModule {}
