import {TestBed} from '@angular/core/testing';

import {ShopNavigatorService} from './shopNavigator.service';

describe('ShopNavigatorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ShopNavigatorService = TestBed.get(ShopNavigatorService);
    expect(service).toBeTruthy();
  });
});
