import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {AlertController} from '@ionic/angular';

import {Currency} from 'src/models/Currency';
import {Dictionary} from 'src/data/Helpers/Dictionary';

@Injectable()
export class CurrencyService {
  private fixerIoApiAccessKey: string = '8dfa36c3c658396ef8aeffd0fdd0a7da';
  private fixerIoUrl: string =
    'http://data.fixer.io/api/latest?access_key=' + this.fixerIoApiAccessKey;

  private rates: any;

  public ratesLoaded: boolean = false;

  public currencies: Currency[] = [];
  public currenciesDictionary: Dictionary<Currency> = new Dictionary<
    Currency
  >();

  constructor(private http: HttpClient, private alertCtrl: AlertController) {}

  initialize() {
    this.getCurrencies();
  }

  getCurrencies() {
    this.getCurrenciesFromJsonFile().then((currencies) => {
      this.currencies = <Currency[]>currencies;
      this.buildCurrencyLookup();
    });
  }

  buildCurrencyLookup() {
    this.currencies.forEach((currency) => {
      this.currenciesDictionary.Add(currency.code, currency);
    });
  }

  getCurrencyByCode(currencyCode: string) {
    if (this.currenciesDictionary.ContainsKey(currencyCode)) {
      return this.currenciesDictionary.Item(currencyCode);
    }

    return null;
  }

  getCurrenciesFromJsonFile() {
    return new Promise((resolve, reject) => {
      var jsonSubscription = this.http
        .get('assets/json/currencies.json')
        .subscribe(
          (data: any) => {
            jsonSubscription.unsubscribe();

            resolve(data.currencies);
          },
          (error) => {
            jsonSubscription.unsubscribe();

            console.error(error);
            reject(error);
          }
        );
    });
  }

  getRates() {
    this.getRatesForBaseCurrency('EUR').then(
      (rates) => {
        this.rates = rates;
        this.ratesLoaded = true;
      },
      (errorCode) => {
        var errorMessage: string = '';

        switch (errorCode) {
          case 104: {
            errorMessage =
              'The maximum allowed API amount of monthly API requests has been reached.';
            break;
          }

          case 105: {
            errorMessage =
              'The current subscription plan does not support this API endpoint.';
            break;
          }
        }

        this.presentAlert('fixer.io Error', errorMessage);
      }
    );
  }

  getValue(fromCurrency: string, toCurrency: string, value: number) {
    return (this.rates[toCurrency] / this.rates[fromCurrency]) * value;
  }

  getRatesForBaseCurrency(baseCurrency: string) {
    return new Promise((resolve, reject) => {
      this.http.get(this.fixerIoUrl + '&base=' + baseCurrency).subscribe(
        (data: any) => {
          if (data.success) {
            resolve(data.rates);
          } else {
            reject(data.error.code);
          }
        },
        (error) => {
          console.error(error);
          reject(error);
        }
      );
    });
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertCtrl.create({
      header: header,
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }
}
