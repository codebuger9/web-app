import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Pack} from 'src/models/Pack';
import {Coin} from 'src/models/Coin';

@Injectable()
export class PacksService {
  public userPacks: Pack[] = [];
  public coinPacks: Coin[] = [];

  constructor(private http: HttpClient) {}

  initialize() {
    this.getUserPacks();
    this.getCoinPacks();
  }

  getUserPacks() {
    var jsonSubscription = this.http
      .get('assets/json/user-packs.json')
      .subscribe(
        (data: any) => {
          jsonSubscription.unsubscribe();
          this.userPacks = <Pack[]>data.userPacks;
        },
        (error) => {
          jsonSubscription.unsubscribe();
          console.error(error);
        }
      );
  }

  getCoinPacks() {
    var jsonSubscription = this.http
      .get('assets/json/coin-packs.json')
      .subscribe(
        (data: any) => {
          jsonSubscription.unsubscribe();
          this.coinPacks = <Coin[]>data.coinPacks;
        },
        (error) => {
          jsonSubscription.unsubscribe();
          console.error(error);
        }
      );
  }
}
