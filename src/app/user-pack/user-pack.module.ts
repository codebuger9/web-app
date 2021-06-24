import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {UserPackComponent} from './user-pack.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule],
  declarations: [UserPackComponent],
  exports: [UserPackComponent],
})
export class UserPackComponentModule {}
