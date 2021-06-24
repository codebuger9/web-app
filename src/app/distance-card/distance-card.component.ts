import {Component, OnInit, Input} from '@angular/core';

import {Card} from 'src/models/Card';

@Component({
  selector: 'distance-card',
  templateUrl: './distance-card.component.html',
  styleUrls: ['./distance-card.component.scss'],
})
export class DistanceCardComponent implements OnInit {
  @Input() card: Card;

  constructor() {}

  ngOnInit() {
    this.card.isLocked = true;
  }
}
