import {Component, OnInit, OnDestroy} from '@angular/core';

import {Subscription} from 'rxjs';

import {FirestoreService} from 'src/services/FirestoreService/firestore.service';

import {ShopDetails} from 'src/models/ShopDetails';

@Component({
  selector: 'shops-list',
  templateUrl: './shops-list.component.html',
  styleUrls: ['./shops-list.component.scss'],
})
export class ShopsListComponent implements OnInit, OnDestroy {
  private shopsSub: Subscription;

  public shops: ShopDetails[] = [];
  public shopsLoaded: boolean = false;

  constructor(private firestoreService: FirestoreService) {}

  ngOnInit() {
    this.shopsSub = this.firestoreService.getShops().subscribe((shops) => {
      this.shops = <ShopDetails[]>shops;
      this.shopsLoaded = true;
    });
  }

  ngOnDestroy() {
    if (this.shopsSub) {
      this.shopsSub.unsubscribe();
    }
  }
}
