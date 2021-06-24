import {Component, OnInit, Input} from '@angular/core';

import {
  ModalController,
  AlertController,
  LoadingController,
} from '@ionic/angular';

import {FirestoreService} from 'src/services/FirestoreService/firestore.service';

import {UserDetails} from 'src/models/UserDetails';
import {Post} from 'src/models/Post';

@Component({
  selector: 'app-post-editor',
  templateUrl: './post-editor.page.html',
  styleUrls: ['./post-editor.page.scss'],
})
export class PostEditorPage implements OnInit {
  @Input() user: UserDetails;
  @Input() post: Post;

  constructor(
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private firestoreService: FirestoreService
  ) {}

  ngOnInit() {}

  updatePost() {
    this.presentLoading('Updating post...').then(() => {
      this.firestoreService
        .updatePost(this.post)
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
