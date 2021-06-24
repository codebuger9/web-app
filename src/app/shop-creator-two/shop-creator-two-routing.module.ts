import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShopCreatorTwoPage } from './shop-creator-two.page';

const routes: Routes = [
  {
    path: '',
    component: ShopCreatorTwoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShopCreatorTwoPageRoutingModule {}
