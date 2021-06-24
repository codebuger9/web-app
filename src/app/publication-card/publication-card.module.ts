import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {PublicationCardComponent} from './publication-card.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule],
  declarations: [PublicationCardComponent],
  exports: [PublicationCardComponent],
})
export class PublicationCardComponentModule {}
