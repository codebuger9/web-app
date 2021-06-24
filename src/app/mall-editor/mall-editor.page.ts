import {Component, OnInit, Input} from '@angular/core';

import {
  AlertController,
  LoadingController,
  ModalController,
} from '@ionic/angular';

import {FirestoreService} from 'src/services/FirestoreService/firestore.service';

import {MallDetails} from 'src/models/MallDetails';
import {User} from 'src/models/User';

@Component({
  selector: 'app-mall-editor',
  templateUrl: './mall-editor.page.html',
  styleUrls: ['./mall-editor.page.scss'],
})
export class MallEditorPage implements OnInit {
  @Input() user: User;
  @Input() mall: MallDetails;

  constructor(
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private firestoreService: FirestoreService
  ) {}

  ngOnInit() {}

  updateMall() {
    this.presentLoading('Updating mall...').then(() => {
      this.firestoreService
        .updateMall(this.mall)
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
