import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {MallCreatorPageRoutingModule} from './mall-creator-routing.module';
import {SharedModule} from '../shared/shared.module';

import {MallCreatorPage} from './mall-creator.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MallCreatorPageRoutingModule,
    SharedModule,
  ],
  declarations: [MallCreatorPage],
})
export class MallCreatorPageModule {}
