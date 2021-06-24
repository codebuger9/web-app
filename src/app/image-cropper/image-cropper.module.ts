import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {ImageCropperPageRoutingModule} from './image-cropper-routing.module';
import {ImageCropperModule} from 'ngx-image-cropper';

import {ImageCropperPage} from './image-cropper.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ImageCropperPageRoutingModule,
    ImageCropperModule,
  ],
  declarations: [ImageCropperPage],
})
export class ImageCropperPageModule {}
