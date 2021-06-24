import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {NotificationListComponent} from './notification-list.component';
import {NotificationComponentModule} from '../notification/notification.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotificationComponentModule,
  ],
  exports: [NotificationListComponent],
  declarations: [NotificationListComponent],
})
export class NotificationListComponentModule {}
