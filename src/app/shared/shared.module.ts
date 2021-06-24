import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';

import {BackButtonComponent} from '../back-button/back-button.component';
import {StoriesComponent} from '../stories/stories.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule],
  declarations: [BackButtonComponent, StoriesComponent],
  exports: [BackButtonComponent, StoriesComponent],
})
export class SharedModule {}
