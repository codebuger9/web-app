import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';

import {
  Platform,
  AlertController,
  NavController,
  ModalController,
} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {LocalNotifications} from '@ionic-native/local-notifications/ngx';

import * as firebase from 'firebase';

import {AuthService} from 'src/services/AuthService/auth.service';
import {FirestoreService} from 'src/services/FirestoreService/firestore.service';
import {CurrencyService} from 'src/services/CurrencyService/currency.service';
import {PacksService} from 'src/services/PacksService/packs.service';
import {CardsService} from 'src/services/CardsService/cards.service';

import {UserDetails} from 'src/models/UserDetails';
import {Discussion} from 'src/models/Discussion';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
})
export class AppComponent {
  private localNotificationIds = 1;

  constructor(
    private router: Router,
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private localNotifications: LocalNotifications,
    private afAuth: AngularFireAuth,
    private authService: AuthService,
    private firestoreService: FirestoreService,
    private currencyService: CurrencyService,
    private packsService: PacksService,
    private cardsService: CardsService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      document.addEventListener(
        'backbutton',
        (event) => {
          event.preventDefault();
          event.stopPropagation();

          this.modalCtrl.getTop().then((modal) => {
            // If modal is open, close it
            if (modal) {
              modal.dismiss();
            }

            // If on tabs page, promt user if they want to exit applicaiton
            else if (this.isTabs()) {
              this.presentExitAppAlert();
            }

            // otherwise navigate back
            else {
              this.navCtrl.back();
            }
          });
        },
        false
      );
    });

    this.afAuth.authState.subscribe((user: firebase.User) => {
      if (user) {
        this.firestoreService.getUser(user.uid).subscribe(
          (user) => {
            this.authService.user = <UserDetails>user;

            this.listenForNewMessages();
          },
          (error) => {
            console.error(error);
          }
        );
      }
    });

    this.currencyService.initialize();
    this.packsService.initialize();
    this.cardsService.initialize();
  }

  listenForNewMessages() {
    this.firestoreService
      .getUnreadDiscussions(this.authService.user.id)
      .subscribe((unreadDiscussions: Discussion[]) => {
        if (unreadDiscussions.length > 0) {
          var lastMessage = unreadDiscussions[0].lastMessage;

          if (lastMessage && lastMessage.user.id !== this.authService.user.id) {
            this.localNotifications.schedule({
              id: this.localNotificationIds++,
              title: 'New Message from ' + lastMessage.user.name,
              text: lastMessage.content,
              icon: lastMessage.user.pictureURL,
              sound: this.platform.is('android')
                ? 'file://sound.mp3'
                : 'file://beep.caf',
            });
          }
        }
      });
  }

  isTabs(): boolean {
    return (
      this.router.routerState.snapshot.url == '/tabs/home' ||
      this.router.routerState.snapshot.url == '/tabs/search' ||
      this.router.routerState.snapshot.url == '/tabs/notifications' ||
      this.router.routerState.snapshot.url == '/tabs/profile'
    );
  }

  async presentExitAppAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Exit application.',
      message: 'Are you sure you want to exit the application?',
      buttons: [
        {text: 'No'},
        {
          text: 'Yes',
          handler: () => {
            navigator['app'].exitApp();
          },
        },
      ],
    });

    await alert.present();
  }
}
