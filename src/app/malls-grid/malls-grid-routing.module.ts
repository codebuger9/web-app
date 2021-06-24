import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MallsGridPage } from './malls-grid.page';

const routes: Routes = [
  {
    path: '',
    component: MallsGridPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MallsGridPageRoutingModule {}
