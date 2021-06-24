import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {DistanceCardComponentModule} from '../distance-card/distance-card.module';
import {DistanceCardsComponent} from './distance-cards.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DistanceCardComponentModule,
  ],
  declarations: [DistanceCardsComponent],
  exports: [DistanceCardsComponent],
})
export class DistanceCardsComponentModule {}
