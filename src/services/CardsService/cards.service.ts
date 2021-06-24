import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Card} from 'src/models/Card';

@Injectable()
export class CardsService {
  public publicationCards: Card[] = [];
  public distanceCards: Card[] = [];

  constructor(private http: HttpClient) {}

  initialize() {
    this.getPublicationCards();
    this.getDistanceCards();
  }

  getPublicationCards() {
    var jsonSubscription = this.http
      .get('assets/json/publication-cards.json')
      .subscribe(
        (data: any) => {
          jsonSubscription.unsubscribe();
          this.publicationCards = <Card[]>data.publicationCards;
        },
        (error) => {
          jsonSubscription.unsubscribe();
          console.error(error);
        }
      );
  }

  getDistanceCards() {
    var jsonSubscription = this.http
      .get('assets/json/distance-cards.json')
      .subscribe(
        (data: any) => {
          jsonSubscription.unsubscribe();
          this.distanceCards = <Card[]>data.distanceCards;
        },
        (error) => {
          jsonSubscription.unsubscribe();
          console.error(error);
        }
      );
  }
}
