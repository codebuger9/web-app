import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';
import {IonicModule} from '@ionic/angular';

import {ReviewsComponentModule} from '../reviews/reviews.module';
import {MallComponentModule} from '../mall/mall.module';
import {ShopComponentModule} from '../shop/shop.module';
import {PostsSliderComponentModule} from '../posts-slider/posts-slider.module';
import {PostsGridComponentModule} from '../posts-grid/posts-grid.module';
import {OffersReceivedComponentModule} from '../offers-received/offers-received.module';
import {OffersSentComponentModule} from '../offers-sent/offers-sent.module';
import {UserPacksComponentModule} from '../user-packs/user-packs.module';
import {CoinPacksComponentModule} from '../coin-packs/coin-packs.module';
import {PublicationCardsComponentModule} from '../publication-cards/publication-cards.module';
import {DistanceCardsComponentModule} from '../distance-cards/distance-cards.module';

import {ProfilePage} from './profile.page';

const routes: Routes = [
  {
    path: '',
    component: ProfilePage,
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ReviewsComponentModule,
    MallComponentModule,
    ShopComponentModule,
    PostsSliderComponentModule,
    PostsGridComponentModule,
    OffersReceivedComponentModule,
    OffersSentComponentModule,
    UserPacksComponentModule,
    CoinPacksComponentModule,
    PublicationCardsComponentModule,
    DistanceCardsComponentModule,
  ],
  declarations: [ProfilePage],
})
export class ProfilePageModule {}
