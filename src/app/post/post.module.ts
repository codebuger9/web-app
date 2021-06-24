import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {PostComponent} from './post.component';

import {PostHeaderComponentModule} from '../post-header/post-header.module';
import {PostImagesSliderComponentModule} from '../post-images-slider/post-images-slider.module';
import {PostButtonsComponentModule} from '../post-buttons/post-buttons.module';
import {PostInfoComponentModule} from '../post-info/post-info.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PostHeaderComponentModule,
    PostImagesSliderComponentModule,
    PostButtonsComponentModule,
    PostInfoComponentModule,
  ],
  exports: [PostComponent],
  declarations: [PostComponent],
})
export class PostComponentModule {}
