import {Component, OnInit, Input} from '@angular/core';

import {CurrencyService} from 'src/services/CurrencyService/currency.service';
import {AuthService} from 'src/services/AuthService/auth.service';

import {Coin} from 'src/models/Coin';

@Component({
  selector: 'coin-pack',
  templateUrl: './coin-pack.component.html',
  styleUrls: ['./coin-pack.component.scss'],
})
export class CoinPackComponent implements OnInit {
  @Input() coin: Coin;

  public coinPrice: string;

  constructor(
    private currencyService: CurrencyService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    var convertedPrice = this.currencyService.getValue(
      'EUR',
      this.authService.user.currency,
      this.coin.price
    );

    this.coinPrice =
      this.authService.user.currency +
      ' ' +
      convertedPrice.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0];
  }
}
