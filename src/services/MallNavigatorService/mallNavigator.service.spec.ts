import {TestBed} from '@angular/core/testing';

import {MallNavigatorService} from './mallNavigator.service';

describe('MallNavigatorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MallNavigatorService = TestBed.get(MallNavigatorService);
    expect(service).toBeTruthy();
  });
});
