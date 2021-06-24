import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MallContainerPage } from './mall-container.page';

const routes: Routes = [
  {
    path: '',
    component: MallContainerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MallContainerPageRoutingModule {}
