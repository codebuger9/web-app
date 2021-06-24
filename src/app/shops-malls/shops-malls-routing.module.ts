import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShopsMallsPage } from './shops-malls.page';

const routes: Routes = [
  {
    path: '',
    component: ShopsMallsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShopsMallsPageRoutingModule {}
