import {Component, OnInit, Input} from '@angular/core';

import {
  AlertController,
  LoadingController,
  ModalController,
} from '@ionic/angular';

import {FirestoreService} from 'src/services/FirestoreService/firestore.service';

import {ShopDetails} from 'src/models/ShopDetails';
import {User} from 'src/models/User';

@Component({
  selector: 'app-shop-editor',
  templateUrl: './shop-editor.page.html',
  styleUrls: ['./shop-editor.page.scss'],
})
export class ShopEditorPage implements OnInit {
  @Input() user: User;
  @Input() shop: ShopDetails;

  constructor(
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private firestoreService: FirestoreService
  ) {}

  ngOnInit() {}

  updateShop() {
    this.presentLoading('Updating shop...').then(() => {
      this.firestoreService
        .updateShop(this.shop)
        .then(
          () => {
            this.loadingCtrl.dismiss();
            this.dismiss();
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

  dismiss() {
    this.modalCtrl.dismiss();
  }
}
