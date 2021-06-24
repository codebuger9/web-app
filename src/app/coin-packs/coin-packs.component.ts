import {Component, OnInit} from '@angular/core';

import {PacksService} from 'src/services/PacksService/packs.service';

@Component({
  selector: 'coin-packs',
  templateUrl: './coin-packs.component.html',
  styleUrls: ['./coin-packs.component.scss'],
})
export class CoinPacksComponent implements OnInit {
  constructor(public packsService: PacksService) {}

  ngOnInit() {}
}
