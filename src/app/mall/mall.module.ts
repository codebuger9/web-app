import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {MallComponent} from './mall.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule],
  exports: [MallComponent],
  declarations: [MallComponent],
})
export class MallComponentModule {}
