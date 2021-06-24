import {Component, OnInit} from '@angular/core';

import {MallNavigatorService} from 'src/services/MallNavigatorService/mallNavigator.service';

import {MallDetails} from 'src/models/MallDetails';

@Component({
  selector: 'app-mall-container',
  templateUrl: './mall-container.page.html',
  styleUrls: ['./mall-container.page.scss'],
})
export class MallContainerPage implements OnInit {
  public mall: MallDetails;

  constructor(private mallNavigatorService: MallNavigatorService) {}

  ngOnInit() {
    this.mall = this.mallNavigatorService.getMall();
  }
}
