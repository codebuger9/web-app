import {Component, OnInit} from '@angular/core';

import {CardsService} from 'src/services/CardsService/cards.service';

@Component({
  selector: 'publication-cards',
  templateUrl: './publication-cards.component.html',
  styleUrls: ['./publication-cards.component.scss'],
})
export class PublicationCardsComponent implements OnInit {
  constructor(public cardsService: CardsService) {}

  ngOnInit() {}
}
