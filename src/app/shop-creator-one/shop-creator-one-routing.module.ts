import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShopCreatorOnePage } from './shop-creator-one.page';

const routes: Routes = [
  {
    path: '',
    component: ShopCreatorOnePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShopCreatorOnePageRoutingModule {}
