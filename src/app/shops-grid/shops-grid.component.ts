import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';

import {Subscription} from 'rxjs';

import {FirestoreService} from 'src/services/FirestoreService/firestore.service';
import {UserNavigatorService} from 'src/services/UserNavigatorService/userNavigator.service';
import {ShopNavigatorService} from 'src/services/ShopNavigatorService/shopNavigator.service';

import {ShopDetails} from 'src/models/ShopDetails';
import {User} from 'src/models/User';

@Component({
  selector: 'shops-grid',
  templateUrl: './shops-grid.component.html',
  styleUrls: ['./shops-grid.component.scss'],
})
export class ShopsGridComponent implements OnInit, OnDestroy {
  private shopsSub: Subscription;

  public shopGroups: ShopDetails[][] = [];
  public shopsLoaded: boolean = false;

  constructor(
    private router: Router,
    private firestoreService: FirestoreService,
    private userNavigatorService: UserNavigatorService,
    private shopNavigatorService: ShopNavigatorService
  ) {}

  ngOnInit() {
    this.shopsSub = this.firestoreService.getShops().subscribe((shops) => {
      this.shopGroups = this.getNChunks(shops, 2);
      this.shopsLoaded = true;
    });
  }

  ngOnDestroy() {
    if (this.shopsSub) {
      this.shopsSub.unsubscribe();
    }
  }

  goToShop(shop: ShopDetails) {
    this.shopNavigatorService.setShop(shop);
    this.router.navigate(['/shop-container']);
  }

  goToUserProfile(user: User) {
    this.userNavigatorService.setUser(user);
    this.router.navigate(['/user-profile']);
  }

  getNChunks(array: any[], size: number) {
    var arrays = [];

    while (array.length > 0) {
      arrays.push(array.splice(0, size));
    }

    return arrays;
  }
}
