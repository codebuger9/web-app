import {Component, OnInit, Input} from '@angular/core';

import {CurrencyService} from 'src/services/CurrencyService/currency.service';

import {Pack} from 'src/models/Pack';
import {AuthService} from 'src/services/AuthService/auth.service';

@Component({
  selector: 'user-pack',
  templateUrl: './user-pack.component.html',
  styleUrls: ['./user-pack.component.scss'],
})
export class UserPackComponent implements OnInit {
  @Input() pack: Pack;

  public packPrice: string;
  public isSelected: boolean = false;

  constructor(
    private currencyService: CurrencyService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    var convertedPrice = this.currencyService.getValue(
      'EUR',
      this.authService.user.currency,
      this.pack.price
    );

    this.packPrice =
      this.authService.user.currency +
      ' ' +
      convertedPrice.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0];

    this.isSelected = this.pack.id === this.authService.user.pack.id;
  }
}
