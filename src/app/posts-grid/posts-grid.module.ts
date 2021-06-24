import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { PostsGridComponent } from './posts-grid.component';
import { PostComponentModule } from '../post/post.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, PostComponentModule],
  exports: [PostsGridComponent],
  declarations: [PostsGridComponent]
})
export class PostsGridComponentModule {}
