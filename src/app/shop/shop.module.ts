import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';

import {ShopComponent} from './shop.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule],
  exports: [ShopComponent],
  declarations: [ShopComponent],
})
export class ShopComponentModule {}
