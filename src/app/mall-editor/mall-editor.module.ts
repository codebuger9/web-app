import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MallEditorPageRoutingModule } from './mall-editor-routing.module';

import { MallEditorPage } from './mall-editor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MallEditorPageRoutingModule
  ],
  declarations: [MallEditorPage]
})
export class MallEditorPageModule {}
