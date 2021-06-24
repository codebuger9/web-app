import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {DiscussionsPageRoutingModule} from './discussions-routing.module';
import {SharedModule} from '../shared/shared.module';
import {DiscussionComponentModule} from '../discussion/discussion.module';

import {DiscussionsPage} from './discussions.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DiscussionsPageRoutingModule,
    SharedModule,
    DiscussionComponentModule,
  ],
  declarations: [DiscussionsPage],
})
export class DiscussionsPageModule {}
