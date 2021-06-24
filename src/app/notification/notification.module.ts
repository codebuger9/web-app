import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {NotificationComponent} from './notification.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule],
  declarations: [NotificationComponent],
  exports: [NotificationComponent],
})
export class NotificationComponentModule {}
