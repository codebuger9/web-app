import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {UserPacksComponent} from './user-packs.component';
import {UserPackComponentModule} from '../user-pack/user-pack.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, UserPackComponentModule],
  declarations: [UserPacksComponent],
  exports: [UserPacksComponent],
})
export class UserPacksComponentModule {}
