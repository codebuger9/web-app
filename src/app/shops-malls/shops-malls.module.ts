import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {ShopsMallsPageRoutingModule} from './shops-malls-routing.module';
import {SharedModule} from '../shared/shared.module';
import {ShopsListComponentModule} from '../shops-list/shops-list.module';
import {ShopsGridComponentModule} from '../shops-grid/shops-grid.module';
import {MallsGridPageModule} from '../malls-grid/malls-grid.module';

import {ShopsMallsPage} from './shops-malls.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShopsMallsPageRoutingModule,
    SharedModule,
    ShopsListComponentModule,
    ShopsGridComponentModule,
    MallsGridPageModule,
  ],
  declarations: [ShopsMallsPage],
})
export class ShopsMallsPageModule {}
