import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {DistanceCardComponent} from './distance-card.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule],
  declarations: [DistanceCardComponent],
  exports: [DistanceCardComponent],
})
export class DistanceCardComponentModule {}
