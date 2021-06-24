import {Component, OnInit, OnDestroy} from '@angular/core';

import {Subscription} from 'rxjs';

import {ShopNavigatorService} from 'src/services/ShopNavigatorService/shopNavigator.service';
import {FirestoreService} from 'src/services/FirestoreService/firestore.service';

import {ShopDetails} from 'src/models/ShopDetails';

@Component({
  selector: 'app-shop-container',
  templateUrl: './shop-container.page.html',
  styleUrls: ['./shop-container.page.scss'],
})
export class ShopContainerPage implements OnInit, OnDestroy {
  private shopSub: Subscription;

  public shop: ShopDetails;
  public shopLoaded = false;

  constructor(
    private shopNavigatorService: ShopNavigatorService,
    private firestoreService: FirestoreService
  ) {}

  ngOnInit() {
    var shopId = this.shopNavigatorService.getShop().id;

    this.shopSub = this.firestoreService.getShop(shopId).subscribe((shop) => {
      this.shop = <ShopDetails>shop;
      this.shopLoaded = true;
    });
  }

  ngOnDestroy() {
    if (this.shopSub) {
      this.shopSub.unsubscribe();
    }
  }
}
