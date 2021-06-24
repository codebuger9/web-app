import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {PostImagesSliderComponent} from './post-images-slider.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule],
  exports: [PostImagesSliderComponent],
  declarations: [PostImagesSliderComponent],
})
export class PostImagesSliderComponentModule {}
