import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShopCreatorTwoPageRoutingModule } from './shop-creator-two-routing.module';
import { SharedModule } from '../shared/shared.module';

import { ShopCreatorTwoPage } from './shop-creator-two.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShopCreatorTwoPageRoutingModule,
    SharedModule,
  ],
  declarations: [ShopCreatorTwoPage]
})
export class ShopCreatorTwoPageModule {}
