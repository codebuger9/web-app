import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MallCreatorPage } from './mall-creator.page';

const routes: Routes = [
  {
    path: '',
    component: MallCreatorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MallCreatorPageRoutingModule {}
