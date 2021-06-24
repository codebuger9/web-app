import {Component, OnInit, Input} from '@angular/core';
import {Router} from '@angular/router';

import {
  ActionSheetController,
  AlertController,
  LoadingController,
  ToastController,
} from '@ionic/angular';

import {AuthService} from 'src/services/AuthService/auth.service';
import {FirestoreService} from 'src/services/FirestoreService/firestore.service';
import {UserNavigatorService} from 'src/services/UserNavigatorService/userNavigator.service';
import {ShopNavigatorService} from 'src/services/ShopNavigatorService/shopNavigator.service';
import {CurrencyService} from 'src/services/CurrencyService/currency.service';

import {VisualPost} from 'src/models/VisualPost';
import {User} from 'src/models/User';
import {Shop} from 'src/models/Shop';
import {ShopDetails} from 'src/models/ShopDetails';
import {Offer} from 'src/models/Offer';

@Component({
  selector: 'post-header',
  templateUrl: './post-header.component.html',
  styleUrls: ['./post-header.component.scss'],
})
export class PostHeaderComponent implements OnInit {
  @Input() post: VisualPost;

  private offer: Offer;

  constructor(
    private router: Router,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private actionSheetCtrl: ActionSheetController,
    private toastCtrl: ToastController,
    private authService: AuthService,
    private firestoreService: FirestoreService,
    private shopNavigatorService: ShopNavigatorService,
    private userNavigatorService: UserNavigatorService,
    private currencyService: CurrencyService
  ) {}

  ngOnInit() {
    if (!this.currencyService.ratesLoaded) {
      this.currencyService.getRates();
    }
  }

  goToShop(shop: Shop) {
    this.shopNavigatorService.setShop(<ShopDetails>shop);
    this.router.navigate(['/shop-container']);
  }

  goToUserProfile(user: User) {
    this.userNavigatorService.setUser(user);
    this.router.navigate(['/user-profile']);
  }

  async openPostActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Send an offer',
          handler: () => {
            // Check that it's not the current user's post
            if (this.post.user.id === this.authService.user.id) {
              this.presentAlert(
                'Cannot send offer',
                'You cannot make an offer on your own post.'
              );
              return;
            }

            // Retrieve any existing offer if any
            this.presentLoading('Retrieving offer...').then(() => {
              this.firestoreService
                .getOffer(this.authService.user, this.post)
                .then((offer: Offer) => {
                  this.loadingCtrl.dismiss();

                  if (offer) {
                    this.offer = offer;
                    this.presentExistingOfferAlert();
                  } else {
                    this.presentNewOfferAlert();
                  }
                })
                .catch((error) => {
                  this.loadingCtrl.dismiss();

                  console.log(error);
                  this.presentAlert('Error', error.message);
                });
            });
          },
        },
        {
          text: 'Report post',
          handler: () => {},
        },
        {
          text: 'Report user',
          handler: () => {},
        },
      ],
    });

    await actionSheet.present();
  }

  async presentNewOfferAlert() {
    var postCurrency = this.post.user.currency;
    var userCurrency = this.authService.user.currency;

    const alert = await this.alertCtrl.create({
      header: 'Make an offer',
      subHeader:
        this.post.shop.name +
        ' expects an offer in ' +
        this.currencyService.getCurrencyByCode(postCurrency).name +
        ' (' +
        postCurrency +
        ')',
      inputs: [
        {
          name: 'offerPostCurrency',
          id: 'offerPostCurrency',
          type: 'number',
          placeholder: 'Enter a value in ' + postCurrency,
        },
        {
          name: 'offerUserCurrency',
          id: 'offerUserCurrency',
          type: 'number',
          placeholder: 'Enter a value in ' + userCurrency,
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Send offer',
          handler: (data) => {
            var offerValue = data.offerPostCurrency;

            if (!offerValue) {
              offerValue = this.currencyService.getValue(
                userCurrency,
                postCurrency,
                data.offerUserCurrency
              );
            }

            var offer = <Offer>{
              user: <User>{
                id: this.authService.user.id,
                name: this.authService.user.name,
                pictureURL: this.authService.user.pictureURL,
                currency: this.authService.user.currency,
              },
              value: offerValue,
            };

            this.sendOffer(offer);
          },
        },
      ],
    });

    this.listenForInputsForConversion(alert);

    await alert.present();
  }

  sendOffer(offer: Offer) {
    this.presentLoading('Sending offer...').then(() => {
      this.firestoreService
        .addOffer(this.post, this.authService.user, offer)
        .then(() => {
          this.post.offersCount++;

          this.loadingCtrl.dismiss();
          this.presentToast('Offer has been sent');
        })
        .catch((error) => {
          this.loadingCtrl.dismiss();

          console.log(error);
          this.presentAlert('Error', error.message);
        });
    });
  }

  async presentExistingOfferAlert() {
    var postCurrency = this.post.user.currency;
    var userCurrency = this.authService.user.currency;

    var originalValueOffer = this.offer.value
      .toString()
      .match(/^-?\d+(?:\.\d{0,2})?/)[0];

    const alert = await this.alertCtrl.create({
      header: 'Change your offer',
      subHeader:
        this.post.shop.name +
        ' expects an offer in ' +
        this.currencyService.getCurrencyByCode(postCurrency).name +
        ' (' +
        postCurrency +
        ')',
      message: 'You can delete a previous offer or modify your existing offer',
      inputs: [
        {
          name: 'offerPostCurrency',
          id: 'offerPostCurrency',
          type: 'number',
          placeholder: 'Enter a value in ' + postCurrency,
          value: originalValueOffer,
        },
        {
          name: 'offerUserCurrency',
          id: 'offerUserCurrency',
          type: 'number',
          placeholder: 'Enter a value in ' + userCurrency,
          value: this.currencyService
            .getValue(postCurrency, userCurrency, this.offer.value)
            .toString()
            .match(/^-?\d+(?:\.\d{0,2})?/)[0],
        },
      ],
      buttons: [
        {
          text: 'Delete offer',
          handler: () => {
            this.deleteOffer(this.offer);
          },
        },
        {
          text: 'Modify offer',
          handler: (data) => {
            var offerValue = data.offerPostCurrency;

            if (!offerValue || offerValue == originalValueOffer) {
              offerValue = this.currencyService.getValue(
                userCurrency,
                postCurrency,
                data.offerUserCurrency
              );

              console.log(offerValue);
            }

            this.offer.value = offerValue;

            this.modifyOffer(this.offer);
          },
        },
      ],
    });

    this.listenForInputsForConversion(alert);

    await alert.present();
  }

  modifyOffer(offer: Offer) {
    this.presentLoading('Modifying offer...').then(() => {
      this.firestoreService
        .updateOffer(this.post, this.authService.user, offer)
        .then(() => {
          this.loadingCtrl.dismiss();
          this.presentToast('Offer has been modified');
        })
        .catch((error) => {
          this.loadingCtrl.dismiss();

          console.log(error);
          this.presentAlert('Error', error.message);
        });
    });
  }

  deleteOffer(offer: Offer) {
    this.presentLoading('Deleting offer...').then(() => {
      this.firestoreService
        .deleteOffer(this.post, this.authService.user, offer)
        .then(() => {
          this.offer = null;
          this.post.offersCount--;

          this.loadingCtrl.dismiss();
          this.presentToast('Offer has been deleted');
        })
        .catch((error) => {
          this.loadingCtrl.dismiss();

          console.log(error);
          this.presentAlert('Error', error.message);
        });
    });
  }

  listenForInputsForConversion(alert: HTMLIonAlertElement) {
    var postCurrencyInput = <HTMLInputElement>(
      alert.querySelector('#offerPostCurrency')
    );

    var userCurrencyInput = <HTMLInputElement>(
      alert.querySelector('#offerUserCurrency')
    );

    var postCurrency = this.post.user.currency;
    var userCurrency = this.authService.user.currency;

    postCurrencyInput.addEventListener('input', () => {
      if (postCurrencyInput.value) {
        var convertedValue = this.currencyService
          .getValue(
            postCurrency,
            userCurrency,
            parseInt(postCurrencyInput.value)
          )
          .toString()
          .match(/^-?\d+(?:\.\d{0,2})?/)[0];

        userCurrencyInput.value = convertedValue;
      } else {
        userCurrencyInput.value = '';
      }
    });

    userCurrencyInput.addEventListener('input', () => {
      if (userCurrencyInput.value) {
        var convertedValue = this.currencyService
          .getValue(
            userCurrency,
            postCurrency,
            parseInt(userCurrencyInput.value)
          )
          .toString()
          .match(/^-?\d+(?:\.\d{0,2})?/)[0];

        postCurrencyInput.value = convertedValue;
      } else {
        postCurrencyInput.value = '';
      }
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

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2000,
      animated: true,
      position: 'bottom',
    });

    toast.present();
  }
}
