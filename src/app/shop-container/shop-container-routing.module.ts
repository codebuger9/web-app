import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShopContainerPage } from './shop-container.page';

const routes: Routes = [
  {
    path: '',
    component: ShopContainerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShopContainerPageRoutingModule {}
