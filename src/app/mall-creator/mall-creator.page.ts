import {Component, OnInit} from '@angular/core';

import {
  LoadingController,
  AlertController,
  ModalController,
  NavController,
} from '@ionic/angular';

import * as firebase from 'firebase';

import {AuthService} from 'src/services/AuthService/auth.service';
import {FirestoreService} from 'src/services/FirestoreService/firestore.service';
import {EventsService} from 'src/services/EventsService/events.service';

import {ImageCropperPage} from '../image-cropper/image-cropper.page';

import {MallDetails} from 'src/models/MallDetails';
import {UserDetails} from 'src/models/UserDetails';
import {User} from 'src/models/User';

@Component({
  selector: 'app-mall-creator',
  templateUrl: './mall-creator.page.html',
  styleUrls: ['./mall-creator.page.scss'],
})
export class MallCreatorPage implements OnInit {
  public mall: MallDetails;
  public user: UserDetails;

  constructor(
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    private authService: AuthService,
    private firestoreService: FirestoreService,
    private eventsService: EventsService
  ) {}

  ngOnInit() {
    this.user = this.authService.user;

    this.initialiseMall();
    this.listenForMallPictureInput();
  }

  initialiseMall() {
    this.mall = <MallDetails>{
      id: this.firestoreService.getNewId(),
      name: '',
      pictureURL: '',
      shopsCount: 0,
      owner: <User>{
        id: this.user.id,
        name: this.user.name,
        pictureURL: this.user.pictureURL,
      },
    };
  }

  publish() {
    this.presentLoading('Publishing mall...').then(() => {
      this.firestoreService
        .addMall(this.mall)
        .then(
          () => {
            this.loadingCtrl.dismiss();

            this.eventsService.publish('newMallCreated', this.mall.id);
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

  listenForMallPictureInput() {
    setTimeout(() => {
      var mallPictureInput = <HTMLInputElement>(
        document.querySelector('#mall-picture-input')
      );

      mallPictureInput.addEventListener('change', (event) => {
        var imageFile = (<any>event.target).files[0];

        if (!imageFile) {
          return;
        }

        this.openImageCropperModal(imageFile, (croppedImageBlob: Blob) => {
          this.presentLoading('Uploading image...').then(() => {
            var uploadPath = `/${this.user.id}/mall-${this.mall.id}/PictureURL`;

            const storageRef = firebase.storage().ref();
            const uploadTask = storageRef
              .child(uploadPath)
              .put(croppedImageBlob);

            uploadTask.then((snapshot) => {
              if (snapshot.state !== 'success') {
                this.loadingCtrl.dismiss();
                this.presentAlert('Error', 'Failed to upload image.');
                return;
              }

              snapshot.ref.getDownloadURL().then((downloadURL) => {
                this.mall.pictureURL = downloadURL;
                this.loadingCtrl.dismiss();
              });
            });
          });
        });
      });
    }, 500);
  }

  async openImageCropperModal(imageBlob: Blob, callback: any) {
    const modal = await this.modalCtrl.create({
      component: ImageCropperPage,
      componentProps: {
        imageBlob: imageBlob,
      },
    });

    modal.onDidDismiss().then((result: any) => {
      callback(result.data.croppedImageBlob);
    });

    return await modal.present();
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
