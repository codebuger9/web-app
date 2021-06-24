import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {
  LoadingController,
  AlertController,
  ModalController,
} from '@ionic/angular';

import * as firebase from 'firebase';

import {AuthService} from 'src/services/AuthService/auth.service';
import {FirestoreService} from 'src/services/FirestoreService/firestore.service';
import {ShopNavigatorService} from 'src/services/ShopNavigatorService/shopNavigator.service';

import {ImageCropperPage} from '../image-cropper/image-cropper.page';

import {ShopDetails} from 'src/models/ShopDetails';
import {UserDetails} from 'src/models/UserDetails';
import {User} from 'src/models/User';
import {Mall} from 'src/models/Mall';

@Component({
  selector: 'app-shop-creator-one',
  templateUrl: './shop-creator-one.page.html',
  styleUrls: ['./shop-creator-one.page.scss'],
})
export class ShopCreatorOnePage implements OnInit {
  public shop: ShopDetails;
  public user: UserDetails;

  constructor(
    private router: Router,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    private authService: AuthService,
    private firestoreService: FirestoreService,
    private shopNavigatorService: ShopNavigatorService
  ) {}

  ngOnInit() {
    this.user = this.authService.user;

    this.initialiseShop();
    this.listenForShopPictureInput();
  }

  initialiseShop() {
    this.shop = <ShopDetails>{
      id: this.firestoreService.getNewId(),
      name: '',
      pictureURL: '',
      user: <User>{
        id: this.user.id,
        name: this.user.name,
        pictureURL: this.user.pictureURL,
      },
      mall: <Mall>{},
      description: '',
      companyName: '',
      address: '',
      employeesCount: 0,
      postsCount: 0,
    };
  }

  next() {
    this.shopNavigatorService.setShop(this.shop);
    this.router.navigate(['/shop-creator-two']);
  }

  listenForShopPictureInput() {
    setTimeout(() => {
      var shopPictureInput = <HTMLInputElement>(
        document.querySelector('#shop-picture-input')
      );

      shopPictureInput.addEventListener('change', (event) => {
        var imageFile = (<any>event.target).files[0];

        if (!imageFile) {
          return;
        }

        this.openImageCropperModal(imageFile, (croppedImageBlob: Blob) => {
          this.presentLoading('Uploading image...').then(() => {
            var uploadPath = `/${this.user.id}/shop-${this.shop.id}/PictureURL`;

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
                this.shop.pictureURL = downloadURL;
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
