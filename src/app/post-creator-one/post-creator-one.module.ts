import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {PostCreatorOnePageRoutingModule} from './post-creator-one-routing.module';
import {SharedModule} from '../shared/shared.module';

import {PostCreatorOnePage} from './post-creator-one.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PostCreatorOnePageRoutingModule,
    SharedModule,
  ],
  declarations: [PostCreatorOnePage],
})
export class PostCreatorOnePageModule {}
