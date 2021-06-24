import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostCreatorTwoPage } from './post-creator-two.page';

const routes: Routes = [
  {
    path: '',
    component: PostCreatorTwoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostCreatorTwoPageRoutingModule {}
