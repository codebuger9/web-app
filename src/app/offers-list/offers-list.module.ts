import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {OffersListPageRoutingModule} from './offers-list-routing.module';
import {SharedModule} from '../shared/shared.module';

import {OffersListPage} from './offers-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OffersListPageRoutingModule,
    SharedModule,
  ],
  declarations: [OffersListPage],
})
export class OffersListPageModule {}
