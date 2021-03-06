import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {ProfileEditorPageRoutingModule} from './profile-editor-routing.module';

import {ProfileEditorPage} from './profile-editor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfileEditorPageRoutingModule,
  ],
  declarations: [ProfileEditorPage],
})
export class ProfileEditorPageModule {}
