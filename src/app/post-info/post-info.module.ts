import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {PostInfoComponent} from './post-info.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule],
  exports: [PostInfoComponent],
  declarations: [PostInfoComponent],
})
export class PostInfoComponentModule {}
