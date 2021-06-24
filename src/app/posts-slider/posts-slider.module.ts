import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { PostsSliderComponent } from './posts-slider.component';
import { PostComponentModule } from '../post/post.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, PostComponentModule],
  exports: [PostsSliderComponent],
  declarations: [PostsSliderComponent]
})
export class PostsSliderComponentModule {}
