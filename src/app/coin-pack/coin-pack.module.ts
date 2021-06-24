import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {CoinPackComponent} from '../coin-pack/coin-pack.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule],
  declarations: [CoinPackComponent],
  exports: [CoinPackComponent],
})
export class CoinPackComponentModule {}
