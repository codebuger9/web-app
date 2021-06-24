import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {UserProfilePageRoutingModule} from './user-profile-routing.module';
import {SharedModule} from '../shared/shared.module';
import {PostsSliderComponentModule} from '../posts-slider/posts-slider.module';
import {PostsGridComponentModule} from '../posts-grid/posts-grid.module';
import {ShopComponentModule} from '../shop/shop.module';
import {ReviewsComponentModule} from '../reviews/reviews.module';

import {UserProfilePage} from './user-profile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserProfilePageRoutingModule,
    SharedModule,
    PostsSliderComponentModule,
    PostsGridComponentModule,
    ShopComponentModule,
    ReviewsComponentModule,
  ],
  declarations: [UserProfilePage],
})
export class UserProfilePageModule {}
