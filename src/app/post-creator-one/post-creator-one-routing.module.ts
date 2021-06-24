import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostCreatorOnePage } from './post-creator-one.page';

const routes: Routes = [
  {
    path: '',
    component: PostCreatorOnePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostCreatorOnePageRoutingModule {}
