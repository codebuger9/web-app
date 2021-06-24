import {Component, OnInit} from '@angular/core';

import {PacksService} from 'src/services/PacksService/packs.service';

@Component({
  selector: 'user-packs',
  templateUrl: './user-packs.component.html',
  styleUrls: ['./user-packs.component.scss'],
})
export class UserPacksComponent implements OnInit {
  constructor(public packsService: PacksService) {}

  ngOnInit() {}
}
