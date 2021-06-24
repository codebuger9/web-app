import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {ReviewsComponent} from './reviews.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule],
  declarations: [ReviewsComponent],
  exports: [ReviewsComponent],
})
export class ReviewsComponentModule {}
