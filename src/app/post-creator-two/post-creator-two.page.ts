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
import {PostNavigatorService} from 'src/services/PostNavigatorService/postNavigator.service';

import {ImageCropperPage} from '../image-cropper/image-cropper.page';

import {Post} from 'src/models/Post';
import {UserDetails} from 'src/models/UserDetails';
import {Enums} from 'src/models/Enums';

@Component({
  selector: 'app-post-creator-two',
  templateUrl: './post-creator-two.page.html',
  styleUrls: ['./post-creator-two.page.scss'],
})
export class PostCreatorTwoPage implements OnInit {
  private user: UserDetails;

  public post: Post;

  constructor(
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private navCtrl: NavController,
    private authService: AuthService,
    private firestoreService: FirestoreService,
    private postNavigatorService: PostNavigatorService
  ) {
    this.user = this.authService.user;
    this.post = this.postNavigatorService.getPost();
  }

  ngOnInit() {
    if (
      this.post.type == Enums.PostType.Service ||
      this.post.type == Enums.PostType.Request
    ) {
      this.listenForPostPictureInput();
    }
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

  publish() {
    this.addPost(true);
  }

  save() {
    this.addPost(false);
  }

  addPost(isPublished: boolean) {
    this.post.isPublished = isPublished;

    this.presentLoading(
      (isPublished ? 'Publishing' : 'Saving') + ' post...'
    ).then(() => {
      this.firestoreService
        .addPost(this.post)
        .then(
          () => {
            this.loadingCtrl.dismiss();
            this.navCtrl.navigateRoot('tabs/home');
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
