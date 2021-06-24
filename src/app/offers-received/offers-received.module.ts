import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {OffersReceivedComponent} from './offers-received.component';
import {OfferComponentModule} from '../offer/offer.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, OfferComponentModule],
  declarations: [OffersReceivedComponent],
  exports: [OffersReceivedComponent],
})
export class OffersReceivedComponentModule {}
