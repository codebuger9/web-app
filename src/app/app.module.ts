import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {IonicModule, IonicRouteStrategy, Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {PhotoLibrary} from '@ionic-native/photo-library/ngx';
import {WebView} from '@ionic-native/ionic-webview/ngx';
import {LocalNotifications} from '@ionic-native/local-notifications/ngx';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import {AuthService} from 'src/services/AuthService/auth.service';
import {EventsService} from 'src/services/EventsService/events.service';
import {CurrencyService} from 'src/services/CurrencyService/currency.service';
import {PacksService} from 'src/services/PacksService/packs.service';
import {CardsService} from 'src/services/CardsService/cards.service';

import {SharePage} from './share/share.page';
import {ProfileEditorPage} from './profile-editor/profile-editor.page';
import {MallEditorPage} from './mall-editor/mall-editor.page';
import {ShopEditorPage} from './shop-editor/shop-editor.page';
import {CommentsPage} from './comments/comments.page';
import {ImageCropperPage} from './image-cropper/image-cropper.page';

import {ImageCropperModule} from 'ngx-image-cropper';

// Firebase
import * as firebase from 'firebase';

// Angular Fire
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {SharedModule} from './shared/shared.module';

// Initialize Firebase
var firebaseConfig = {
  apiKey: 'AIzaSyD-xu5ryWgByVG3Y6ZXwlLf-CjqyebG4VQ',
  authDomain: 'istabrag-ac35c.firebaseapp.com',
  databaseURL: 'https://istabrag-ac35c.firebaseio.com',
  projectId: 'istabrag-ac35c',
  storageBucket: 'istabrag-ac35c.appspot.com',
  messagingSenderId: '927442648462',
  appId: '1:927442648462:web:ffbec80e600b4c61d7f8df',
  measurementId: 'G-DKB6D3Y9K0',
};

firebase.initializeApp(firebaseConfig);

@NgModule({
  declarations: [
    AppComponent,
    SharePage,
    ProfileEditorPage,
    MallEditorPage,
    ShopEditorPage,
    CommentsPage,
    ImageCropperPage,
  ],
  entryComponents: [
    SharePage,
    ProfileEditorPage,
    MallEditorPage,
    ShopEditorPage,
    CommentsPage,
    ImageCropperPage,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    IonicModule.forRoot({hardwareBackButton: false}),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AppRoutingModule,
    SharedModule,
    ImageCropperModule,
    HttpClientModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Platform,
    PhotoLibrary,
    WebView,
    LocalNotifications,
    AuthService,
    EventsService,
    CurrencyService,
    PacksService,
    CardsService,
    {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
