import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: './landing/landing.module#LandingPageModule',
  },
  {path: '', loadChildren: './tabs/tabs.module#TabsPageModule'},
  {path: 'login', loadChildren: './login/login.module#LoginPageModule'},
  {path: 'home', loadChildren: './home/home.module#HomePageModule'},
  {path: 'search', loadChildren: './search/search.module#SearchPageModule'},
  {
    path: 'post-editor',
    loadChildren: './post-editor/post-editor.module#PostEditorPageModule',
  },
  {
    path: 'notifications',
    loadChildren:
      './notifications/notifications.module#NotificationsPageModule',
  },
  {
    path: 'profile',
    loadChildren: './profile/profile.module#ProfilePageModule',
  },
  {
    path: 'post-container',
    loadChildren:
      './post-container/post-container.module#PostContainerPageModule',
  },
  {
    path: 'comments/:id',
    loadChildren: './comments/comments.module#CommentsPageModule',
  },
  {path: 'share', loadChildren: './share/share.module#SharePageModule'},
  {path: 'likes/:id', loadChildren: './likes/likes.module#LikesPageModule'},
  {
    path: 'post-filters/:id',
    loadChildren: './post-filters/post-filters.module#PostFiltersPageModule',
  },
  {
    path: 'post-share',
    loadChildren: './post-share/post-share.module#PostSharePageModule',
  },
  {
    path: 'login',
    loadChildren: './login/login.module#LoginPageModule',
  },
  {
    path: 'post-creator-one',
    loadChildren:
      './post-creator-one/post-creator-one.module#PostCreatorOnePageModule',
  },
  {
    path: 'post-creator-two',
    loadChildren:
      './post-creator-two/post-creator-two.module#PostCreatorTwoPageModule',
  },
  {
    path: 'shop-creator-one',
    loadChildren:
      './shop-creator-one/shop-creator-one.module#ShopCreatorOnePageModule',
  },
  {
    path: 'shop-creator-two',
    loadChildren:
      './shop-creator-two/shop-creator-two.module#ShopCreatorTwoPageModule',
  },
  {
    path: 'shop-creator-three',
    loadChildren:
      './shop-creator-three/shop-creator-three.module#ShopCreatorThreePageModule',
  },
  {
    path: 'user-profile',
    loadChildren: './user-profile/user-profile.module#UserProfilePageModule',
  },
  {
    path: 'shop-container',
    loadChildren:
      './shop-container/shop-container.module#ShopContainerPageModule',
  },
  {
    path: 'shops-malls',
    loadChildren: './shops-malls/shops-malls.module#ShopsMallsPageModule',
  },
  {
    path: 'mall-creator',
    loadChildren: './mall-creator/mall-creator.module#MallCreatorPageModule',
  },
  {
    path: 'mall-container',
    loadChildren:
      './mall-container/mall-container.module#MallContainerPageModule',
  },
  {
    path: 'offers-list',
    loadChildren: './offers-list/offers-list.module#OffersListPageModule',
  },
  {
    path: 'discussions',
    loadChildren: './discussions/discussions.module#DiscussionsPageModule',
  },
  {
    path: 'messages/:id',
    loadChildren: './messages/messages.module#MessagesPageModule',
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
