import {Injectable} from '@angular/core';

import {MallDetails} from 'src/models/MallDetails';

@Injectable({
  providedIn: 'root',
})
export class MallNavigatorService {
  private mall: MallDetails;

  constructor() {}

  setMall(mall: MallDetails) {
    this.mall = mall;
  }

  getMall(): MallDetails {
    return this.mall;
  }
}
