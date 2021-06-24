import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {ShopCreatorThreePageRoutingModule} from './shop-creator-three-routing.module';
import {SharedModule} from '../shared/shared.module';

import {ShopCreatorThreePage} from './shop-creator-three.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShopCreatorThreePageRoutingModule,
    SharedModule,
  ],
  declarations: [ShopCreatorThreePage],
})
export class ShopCreatorThreePageModule {}
