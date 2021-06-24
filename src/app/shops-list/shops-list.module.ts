import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';

import {ShopsListComponent} from './shops-list.component';
import {ShopComponentModule} from '../shop/shop.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, ShopComponentModule],
  exports: [ShopsListComponent],
  declarations: [ShopsListComponent],
})
export class ShopsListComponentModule {}
