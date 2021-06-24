import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {MallContainerPageRoutingModule} from './mall-container-routing.module';
import {SharedModule} from '../shared/shared.module';
import {MallComponentModule} from '../mall/mall.module';

import {MallContainerPage} from './mall-container.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MallContainerPageRoutingModule,
    MallComponentModule,
    SharedModule,
  ],
  declarations: [MallContainerPage],
})
export class MallContainerPageModule {}
