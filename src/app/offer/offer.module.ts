import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {OfferComponent} from './offer.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule],
  exports: [OfferComponent],
  declarations: [OfferComponent],
})
export class OfferComponentModule {}
