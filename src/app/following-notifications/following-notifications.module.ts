import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { FollowingNotificationsComponent } from './following-notifications.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule],
  exports: [FollowingNotificationsComponent],
  declarations: [FollowingNotificationsComponent]
})
export class FollowingNotificationsComponentModule {}
