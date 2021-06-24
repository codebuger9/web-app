import {Injectable} from '@angular/core';

import {ShopDetails} from 'src/models/ShopDetails';

@Injectable({
  providedIn: 'root',
})
export class ShopNavigatorService {
  private shop: ShopDetails;

  constructor() {}

  setShop(shop: ShopDetails) {
    this.shop = shop;
  }

  getShop(): ShopDetails {
    return this.shop;
  }
}
