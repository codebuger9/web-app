import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';

import {Subscription} from 'rxjs';

import {ShopNavigatorService} from 'src/services/ShopNavigatorService/shopNavigator.service';
import {FirestoreService} from 'src/services/FirestoreService/firestore.service';

import {Enums} from 'src/models/Enums';
import {ShopDetails} from 'src/models/ShopDetails';
import {Mall} from 'src/models/Mall';

@Component({
  selector: 'app-shop-creator-two',
  templateUrl: './shop-creator-two.page.html',
  styleUrls: ['./shop-creator-two.page.scss'],
})
export class ShopCreatorTwoPage implements OnInit, OnDestroy {
  private mallsSub: Subscription;

  public shop: ShopDetails;
  public malls: Mall[] = [];

  public businessType: Enums.BusinessType;
  public shopType: Enums.ShopType;
  public mallsLoaded: boolean = false;

  constructor(
    private router: Router,
    private shopNavigatorService: ShopNavigatorService,
    private firestoreService: FirestoreService
  ) {
    this.shop = this.shopNavigatorService.getShop();
  }

  ngOnInit() {
    this.getMalls();
  }

  ngOnDestroy() {
    if (this.mallsSub) {
      this.mallsSub.unsubscribe();
    }
  }

  getMalls() {
    this.mallsSub = this.firestoreService.getMalls().subscribe((malls) => {
      malls.forEach((mall) => {
        this.malls.push(<Mall>{
          id: mall.id,
          name: mall.name,
          pictureURL: mall.pictureURL,
        });

        this.mallsLoaded = true;
      });
    });
  }

  mallSelected(event: any) {
    var mallId = event.detail.value;

    var mall = this.malls.find((mall: Mall) => {
      return mall.id === mallId;
    });

    if (mall) {
      this.shop.mall = mall;
    }
  }

  next() {
    this.shop.businessType = <Enums.BusinessType>this.businessType;
    this.shop.shopType = <Enums.ShopType>this.shopType;

    this.shopNavigatorService.setShop(this.shop);

    this.router.navigate(['/shop-creator-three']);
  }
}
