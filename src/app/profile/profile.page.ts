import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';

import {
  ModalController,
  ActionSheetController,
  LoadingController,
  AlertController,
} from '@ionic/angular';

import {Subscription} from 'rxjs';

import {AuthService} from 'src/services/AuthService/auth.service';
import {FirestoreService} from 'src/services/FirestoreService/firestore.service';
import {EventsService} from 'src/services/EventsService/events.service';

import {ProfileEditorPage} from '../profile-editor/profile-editor.page';

import {UserDetails} from 'src/models/UserDetails';
import {ShopDetails} from 'src/models/ShopDetails';
import {MallDetails} from 'src/models/MallDetails';
import {Enums} from 'src/models/Enums';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit, OnDestroy {
  private userSub: Subscription;
  private shopSub: Subscription;
  private mallSub: Subscription;

  public type: string = 'reviews';
  public postsDisplayType: string = 'list';
  public offerDisplayType: string = 'received';
  public packType: string = 'user-packs';
  public cardType: string = 'publication-cards';

  public user: UserDetails;
  public shop: ShopDetails;
  public shopLoaded: boolean = false;
  public mall: MallDetails;
  public mallLoaded: boolean = false;

  constructor(
    private router: Router,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private actionSheetCtrl: ActionSheetController,
    private authService: AuthService,
    private firestoreService: FirestoreService,
    private eventsService: EventsService
  ) {}

  ngOnInit() {
    this.user = this.authService.user;

    this.getUserDetails(this.user.id);

    // Get shop if any
    var shopId = this.user.shop ? this.user.shop.id : null;
    this.getShop(shopId);

    this.eventsService.subscribe('newShopCreated', (shopId: string) => {
      this.getShop(shopId);
    });

    // Get mall if any and has permission
    if (this.user.permissionLevel === Enums.PermissionLevel.Administrator) {
      var mallId = this.user.mall ? this.user.mall.id : null;
      this.getMall(mallId);

      this.eventsService.subscribe('newMallCreated', (mallId: string) => {
        this.getMall(mallId);
      });
    }
  }

  ngOnDestroy() {
    this.eventsService.unsubscribe('newShopCreated');
    this.eventsService.unsubscribe('newMallCreated');

    if (this.userSub) {
      this.userSub.unsubscribe();
    }

    if (this.shopSub) {
      this.shopSub.unsubscribe();
    }

    if (this.mallSub) {
      this.mallSub.unsubscribe();
    }
  }

  getUserDetails(userId: string) {
    this.userSub = this.firestoreService.getUser(userId).subscribe((user) => {
      this.user = <UserDetails>user;
    });
  }

  getShop(shopId: string) {
    if (!shopId) {
      this.shopLoaded = true;
      return;
    }

    this.shopSub = this.firestoreService.getShop(shopId).subscribe((shop) => {
      this.shop = <ShopDetails>shop;
      this.shopLoaded = true;
    });
  }

  getMall(mallId: string) {
    if (!mallId) {
      this.mallLoaded = true;
      return;
    }

    this.mallSub = this.firestoreService.getMall(mallId).subscribe((mall) => {
      this.mall = <MallDetails>mall;
      this.mallLoaded = true;
    });
  }

  editProfile() {
    this.openProfileEditorModal();
  }

  navigateToMallCreator() {
    this.router.navigate(['/mall-creator']);
  }

  navigateToShopCreator() {
    this.router.navigate(['/shop-creator-one']);
  }

  async openProfileEditorModal() {
    const modal = await this.modalCtrl.create({
      component: ProfileEditorPage,
      componentProps: {
        user: this.user,
      },
    });

    return await modal.present();
  }

  async openProfileActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Sign Out',
          handler: () => {
            this.presentLoading('Logging out...').then(() => {
              this.authService
                .signOut()
                .then(() => {
                  this.loadingCtrl.dismiss();
                  this.router.navigateByUrl('login');
                })
                .catch((error) => {
                  this.loadingCtrl.dismiss();

                  console.log(error);
                  this.presentAlert('Log Out Error', error.message);
                });
            });
          },
        },
      ],
    });

    await actionSheet.present();
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
