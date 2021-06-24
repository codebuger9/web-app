import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {PostCreatorTwoPageRoutingModule} from './post-creator-two-routing.module';
import {SharedModule} from '../shared/shared.module';

import {PostCreatorTwoPage} from './post-creator-two.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PostCreatorTwoPageRoutingModule,
    SharedModule,
  ],
  declarations: [PostCreatorTwoPage],
})
export class PostCreatorTwoPageModule {}
