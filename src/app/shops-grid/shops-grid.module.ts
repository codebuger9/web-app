import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';

import {PostComponentModule} from '../post/post.module';
import {ShopsGridComponent} from './shops-grid.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, PostComponentModule],
  exports: [ShopsGridComponent],
  declarations: [ShopsGridComponent],
})
export class ShopsGridComponentModule {}
