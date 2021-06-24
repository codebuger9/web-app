import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';
import {OffersSentComponent} from './offers-sent.component';

import {OfferComponentModule} from '../offer/offer.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, OfferComponentModule],
  declarations: [OffersSentComponent],
  exports: [OffersSentComponent],
})
export class OffersSentComponentModule {}
