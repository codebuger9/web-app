import {Component, OnInit} from '@angular/core';

import {CardsService} from 'src/services/CardsService/cards.service';

@Component({
  selector: 'distance-cards',
  templateUrl: './distance-cards.component.html',
  styleUrls: ['./distance-cards.component.scss'],
})
export class DistanceCardsComponent implements OnInit {
  constructor(public cardsService: CardsService) {}

  ngOnInit() {}
}
