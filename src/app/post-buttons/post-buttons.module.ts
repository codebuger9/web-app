import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {PostButtonsComponent} from './post-buttons.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule],
  exports: [PostButtonsComponent],
  declarations: [PostButtonsComponent],
})
export class PostButtonsComponentModule {}
