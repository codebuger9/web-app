import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {ShopContainerPageRoutingModule} from './shop-container-routing.module';
import {SharedModule} from '../shared/shared.module';
import {ShopComponentModule} from '../shop/shop.module';

import {ShopContainerPage} from './shop-container.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShopContainerPageRoutingModule,
    SharedModule,
    ShopComponentModule,
  ],
  declarations: [ShopContainerPage],
})
export class ShopContainerPageModule {}
