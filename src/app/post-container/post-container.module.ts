import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';
import {IonicModule} from '@ionic/angular';

import {PostContainerPage} from './post-container.page';
import {PostComponentModule} from '../post/post.module';
import {SharedModule} from '../shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: PostContainerPage,
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    PostComponentModule,
    SharedModule,
  ],
  declarations: [PostContainerPage],
})
export class PostContainerPageModule {}
