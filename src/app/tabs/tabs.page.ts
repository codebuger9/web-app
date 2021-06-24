import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';

import {AlertController} from '@ionic/angular';

import {Subscription} from 'rxjs';

import {AuthService} from 'src/services/AuthService/auth.service';
import {FirestoreService} from 'src/services/FirestoreService/firestore.service';

import {UserDetails} from 'src/models/UserDetails';
import {Notification} from 'src/models/Notification';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage implements OnInit, OnDestroy {
  private user: UserDetails;

  private userSub: Subscription;
  private unreadNotificationsSub: Subscription;

  public unreadNotificationsCount: number = 0;

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private alertCtrl: AlertController,
    private authService: AuthService,
    private firestoreService: FirestoreService
  ) {}

  ngOnInit() {
    this.userSub = this.afAuth.authState.subscribe((user: firebase.User) => {
      if (user) {
        this.listenForNewNotifications(user.uid);
      }
    });
  }

  ngOnDestroy() {
    if (this.userSub) {
      this.userSub.unsubscribe();
    }

    if (this.unreadNotificationsSub) {
      this.unreadNotificationsSub.unsubscribe();
    }
  }

  onTabChanged(event: any) {
    if (event.tab === 'notifications') {
      this.firestoreService
        .getUnreadNotificationsOnce(this.authService.user.id)
        .then((unreadNotifications: Notification[]) => {
          this.firestoreService.markNotificationsAsRead(
            this.authService.user.id,
            unreadNotifications
          );
        });
    }
  }

  listenForNewNotifications(userId: string) {
    this.unreadNotificationsSub = this.firestoreService
      .getUnreadNotifications(userId)
      .subscribe((notifications: Notification[]) => {
        this.unreadNotificationsCount = notifications.length;
      });
  }

  openPostEditor() {
    this.user = this.authService.user;

    if (this.user.shop.id) {
      this.navigateToPostCreator();
    } else {
      this.presentNoShopAlert();
    }
  }

  async presentNoShopAlert() {
    const alert = await this.alertCtrl.create({
      header: 'No active shop',
      message: "You don't have an active shop. Create a shop now?",
      buttons: [
        {
          text: 'No',
        },
        {
          text: 'Yes',
          handler: () => {
            this.navigateToShopCreator();
          },
        },
      ],
    });

    await alert.present();
  }

  navigateToShopCreator() {
    this.router.navigate(['/shop-creator-one']);
  }

  navigateToPostCreator() {
    this.router.navigate(['/post-creator-one']);
  }
}
