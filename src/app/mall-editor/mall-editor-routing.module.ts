import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MallEditorPage } from './mall-editor.page';

const routes: Routes = [
  {
    path: '',
    component: MallEditorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MallEditorPageRoutingModule {}
