import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {PublicationCardsComponent} from './publication-cards.component';
import {PublicationCardComponentModule} from '../publication-card/publication-card.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PublicationCardComponentModule,
  ],
  declarations: [PublicationCardsComponent],
  exports: [PublicationCardsComponent],
})
export class PublicationCardsComponentModule {}
