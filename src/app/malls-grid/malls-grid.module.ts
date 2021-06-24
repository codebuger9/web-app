import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {MallsGridPageRoutingModule} from './malls-grid-routing.module';

import {MallsGridPage} from './malls-grid.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, MallsGridPageRoutingModule],
  declarations: [MallsGridPage],
  exports: [MallsGridPage],
})
export class MallsGridPageModule {}
