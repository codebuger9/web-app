import {Component, OnInit, Input} from '@angular/core';

import {
  ModalController,
  LoadingController,
  AlertController,
} from '@ionic/angular';

import * as firebase from 'firebase';
declare var google;

import {FirestoreService} from 'src/services/FirestoreService/firestore.service';
import {AuthService} from 'src/services/AuthService/auth.service';
import {CurrencyService} from 'src/services/CurrencyService/currency.service';

import {ImageCropperPage} from '../image-cropper/image-cropper.page';

import {UserDetails} from 'src/models/UserDetails';

@Component({
  selector: 'app-profile-editor',
  templateUrl: './profile-editor.page.html',
  styleUrls: ['./profile-editor.page.scss'],
})
export class ProfileEditorPage implements OnInit {
  @Input() user: UserDetails;

  constructor(
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private authService: AuthService,
    private firestoreService: FirestoreService,
    public currencyService: CurrencyService
  ) {}

  ngOnInit() {
    this.initialiseLocationMap();
    this.listenForUserPictureInput();
  }

  currencySelected(event: any) {
    var currencyCode = event.detail.value;
    if (currencyCode) {
      this.user.currency = currencyCode;
    }
  }

  initialiseLocationMap() {
    var userLocation = this.authService.user.location;

    var map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: userLocation.latitude, lng: userLocation.longitude},
      zoom: 12,
      disableDefaultUI: true,
    });

    map.setOptions({
      draggable: false,
      zoomControl: false,
      scrollwheel: false,
      disableDoubleClickZoom: true,
    });

    new google.maps.Marker({
      position: {lat: userLocation.latitude, lng: userLocation.longitude},
      map: map,
    });
  }

  listenForUserPictureInput() {
    setTimeout(() => {
      var shopPictureInput = <HTMLInputElement>(
        document.querySelector('#user-picture-input')
      );

      shopPictureInput.addEventListener('change', (event) => {
        var imageFile = (<any>event.target).files[0];

        if (!imageFile) {
          return;
        }

        this.openImageCropperModal(imageFile, (croppedImageBlob: Blob) => {
          this.presentLoading('Uploading image...').then(() => {
            var uploadPath = `/${this.user.id}/PictureURL`;

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
                this.user.pictureURL = downloadURL;
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

  updateUser() {
    this.presentLoading('Updating user...').then(() => {
      this.firestoreService
        .updateUser(this.user)
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
