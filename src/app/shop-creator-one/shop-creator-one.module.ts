import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {ShopCreatorOnePageRoutingModule} from './shop-creator-one-routing.module';
import {SharedModule} from '../shared/shared.module';

import {ShopCreatorOnePage} from './shop-creator-one.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShopCreatorOnePageRoutingModule,
    SharedModule,
  ],
  declarations: [ShopCreatorOnePage],
})
export class ShopCreatorOnePageModule {}
