import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {CoinPacksComponent} from './coin-packs.component';
import {CoinPackComponentModule} from '../coin-pack/coin-pack.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, CoinPackComponentModule],
  declarations: [CoinPacksComponent],
  exports: [CoinPacksComponent],
})
export class CoinPacksComponentModule {}
