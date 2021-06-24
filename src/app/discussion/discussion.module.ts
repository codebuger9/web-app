import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {DiscussionComponent} from './discussion.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule],
  declarations: [DiscussionComponent],
  exports: [DiscussionComponent],
})
export class DiscussionComponentModule {}
