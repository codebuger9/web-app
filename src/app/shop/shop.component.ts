import {Component, OnInit, Input} from '@angular/core';
import {Router} from '@angular/router';

import {ModalController, AlertController} from '@ionic/angular';

import {FirestoreService} from 'src/services/FirestoreService/firestore.service';
import {UserNavigatorService} from 'src/services/UserNavigatorService/userNavigator.service';
import {AuthService} from 'src/services/AuthService/auth.service';

import {ShopEditorPage} from '../shop-editor/shop-editor.page';

import {ShopDetails} from 'src/models/ShopDetails';
import {User} from 'src/models/User';

@Component({
  selector: 'shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {
  @Input() shop: ShopDetails;
  @Input() isProfile: boolean;

  public canEdit: boolean = false;

  constructor(
    private router: Router,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private userNavigatorService: UserNavigatorService,
    private firestoreService: FirestoreService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.canEdit = this.authService.user.id === this.shop.user.id;
  }

  goToUserProfile(user: User) {
    this.userNavigatorService.setUser(user);
    this.router.navigate(['/user-profile']);
  }

  deleteShop() {
    this.presentDeleteAlert();
  }

  async presentDeleteAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Delete shop?',
      message: 'Any posts created in this shop will also be deleted.',
      buttons: [
        {
          text: 'No',
        },
        {
          text: 'Yes',
          handler: () => {
            this.firestoreService.deleteShop(this.shop);
          },
        },
      ],
    });

    await alert.present();
  }

  editShop() {
    this.openShopEditorModal(this.shop);
  }

  async openShopEditorModal(shopDetails?: ShopDetails) {
    const modal = await this.modalCtrl.create({
      component: ShopEditorPage,
      componentProps: {
        user: this.shop.user,
        shop: shopDetails,
      },
    });

    return await modal.present();
  }
}
