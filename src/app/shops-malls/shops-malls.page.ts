import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-shops-malls',
  templateUrl: './shops-malls.page.html',
  styleUrls: ['./shops-malls.page.scss'],
})
export class ShopsMallsPage implements OnInit {
  public type: string = 'shops';
  public shopDisplayType: string = 'list';

  constructor() {}

  ngOnInit() {}
}
