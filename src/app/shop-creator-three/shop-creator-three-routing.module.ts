import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShopCreatorThreePage } from './shop-creator-three.page';

const routes: Routes = [
  {
    path: '',
    component: ShopCreatorThreePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShopCreatorThreePageRoutingModule {}
