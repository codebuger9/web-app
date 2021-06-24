import {Component, OnInit} from '@angular/core';

import {
  NavController,
  AlertController,
  LoadingController,
} from '@ionic/angular';

import {FirestoreService} from 'src/services/FirestoreService/firestore.service';
import {ShopNavigatorService} from 'src/services/ShopNavigatorService/shopNavigator.service';
import {EventsService} from 'src/services/EventsService/events.service';

import {ShopDetails} from 'src/models/ShopDetails';

@Component({
  selector: 'app-shop-creator-three',
  templateUrl: './shop-creator-three.page.html',
  styleUrls: ['./shop-creator-three.page.scss'],
})
export class ShopCreatorThreePage implements OnInit {
  public shop: ShopDetails;

  constructor(
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
    private firestoreService: FirestoreService,
    private shopNavigatorService: ShopNavigatorService,
    private eventsService: EventsService
  ) {
    this.shop = this.shopNavigatorService.getShop();
  }

  ngOnInit() {}

  publish() {
    this.presentLoading('Publishing shop...').then(() => {
      this.firestoreService
        .addShop(this.shop)
        .then(
          () => {
            this.loadingCtrl.dismiss();

            this.eventsService.publish('newShopCreated', this.shop.id);
            this.navCtrl.navigateRoot('tabs/profile');
          },
          (error) => {
            this.loadingCtrl.dismiss();
            this.presentAlert('Error', error.message);
          }
        )
        .catch((error) => {
          this.loadingCtrl.dismiss();
          this.presentAlert('Error', error.message);
        });
    });
  }

  async presentLoading(message: string) {
    const loading = await this.loadingCtrl.create({
      message: message,
      spinner: 'bubbles',
    });

    await loading.present();
  }

  async presentAlert(header: string, errorMessage: string) {
    const alert = await this.alertCtrl.create({
      header: header,
      message: errorMessage,
      buttons: ['OK'],
    });

    await alert.present();
  }
}
