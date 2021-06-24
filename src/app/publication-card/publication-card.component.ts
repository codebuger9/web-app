import {Component, OnInit, Input} from '@angular/core';

import {Card} from 'src/models/Card';

@Component({
  selector: 'publication-card',
  templateUrl: './publication-card.component.html',
  styleUrls: ['./publication-card.component.scss'],
})
export class PublicationCardComponent implements OnInit {
  @Input() card: Card;

  constructor() {}

  ngOnInit() {
    this.card.isLocked = true;
  }
}
