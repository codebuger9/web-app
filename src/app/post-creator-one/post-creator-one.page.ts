import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import * as firebase from 'firebase';

import {
  ModalController,
  AlertController,
  LoadingController,
} from '@ionic/angular';

import {FirestoreService} from 'src/services/FirestoreService/firestore.service';
import {AuthService} from 'src/services/AuthService/auth.service';
import {PostNavigatorService} from 'src/services/PostNavigatorService/postNavigator.service';

import {ImageCropperPage} from '../image-cropper/image-cropper.page';

import {Enums} from 'src/models/Enums';
import {UserDetails} from 'src/models/UserDetails';
import {User} from 'src/models/User';
import {Post} from 'src/models/Post';

@Component({
  selector: 'app-post-creator-one',
  templateUrl: './post-creator-one.page.html',
  styleUrls: ['./post-creator-one.page.scss'],
})
export class PostCreatorOnePage implements OnInit {
  private user: UserDetails;

  public post: Post;
  public postType: Enums.PostType;

  constructor(
    private router: Router,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private authService: AuthService,
    private firestoreService: FirestoreService,
    private postNavigatorService: PostNavigatorService
  ) {}

  ngOnInit() {
    this.user = this.authService.user;

    this.initialisePost();
  }

  initialisePost() {
    this.post = <Post>{
      id: this.firestoreService.getNewId(),
      user: <User>{
        id: this.user.id,
        name: this.user.name,
        pictureURL: this.user.pictureURL,
        currency: this.user.currency,
        location: this.authService.user.location,
      },
      shop: this.user.shop,
      pictureURLs: [],
      title: '',
      description: '',
      priceRange: {
        lowerValue: 0,
        higherValue: 0,
      },
      likesCount: 0,
      offersCount: 0,
      discussionsCount: 0,
    };
  }

  postTypeChanged(event: any) {
    this.post.type = <Enums.PostType>event.detail.value;

    if (this.post.type == Enums.PostType.Product) {
      this.listenForPostPictureInput();
    }
  }

  next() {
    this.postNavigatorService.setPost(this.post);
    this.router.navigate(['/post-creator-two']);
  }

  listenForPostPictureInput() {
    setTimeout(() => {
      var postPictureInput = <HTMLInputElement>(
        document.querySelector('#post-picture-input')
      );

      postPictureInput.addEventListener('change', (event) => {
        var imageFile = (<any>event.target).files[0];

        if (!imageFile) {
          return;
        }

        this.openImageCropperModal(imageFile, (croppedImageBlob: Blob) => {
          this.presentLoading('Uploading image...').then(() => {
            var pictureNo = this.post.pictureURLs.length + 1;
            var uploadPath = `/${this.user.id}/shop-${this.user.shop.id}/${this.post.id}/post-${pictureNo}-pictureURL`;

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
                this.createPictureItem(uploadPath, downloadURL);
                this.post.pictureURLs.push(downloadURL);

                postPictureInput.value = '';

                this.loadingCtrl.dismiss();
              });
            });
          });
        });
      });
    }, 500);
  }

  createPictureItem(uploadPath: string, pictureUrl: string) {
    var postPicturesList = document.querySelector('#post-pictures-list');

    var item = document.createElement('ion-item');
    item.lines = 'none';

    var image = document.createElement('img');
    image.src = pictureUrl;

    item.appendChild(image);

    var deleteButton = document.createElement('ion-button');
    deleteButton.fill = 'clear';
    deleteButton.slot = 'end';

    deleteButton.addEventListener('click', () => {
      this.presentLoading('Deleting image...').then(() => {
        this.deletePicture(uploadPath)
          .then(
            () => {
              var deleteIndex = this.post.pictureURLs.indexOf(pictureUrl);
              if (deleteIndex > -1) {
                this.post.pictureURLs.splice(deleteIndex, 1);
              }

              postPicturesList.removeChild(item);

              this.loadingCtrl.dismiss();
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
    });

    var deleteButtonIcon = document.createElement('ion-icon');
    deleteButtonIcon.name = 'close-circle-outline';

    deleteButton.appendChild(deleteButtonIcon);
    item.appendChild(deleteButton);

    postPicturesList.appendChild(item);
  }

  deletePicture(uploadPath: string) {
    return new Promise((resolve, reject) => {
      const storageRef = firebase.storage().ref();
      var postPictureRef = storageRef.child(uploadPath);

      // Delete the file
      postPictureRef
        .delete()
        .then(function () {
          // File deleted successfully
          resolve();
        })
        .catch(function (error) {
          // Uh-oh, an error occurred!
          reject();
        });
    });
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
