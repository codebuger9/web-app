import {TestBed} from '@angular/core/testing';

import {UserNavigatorService} from './userNavigator.service';

describe('UserNavigatorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserNavigatorService = TestBed.get(UserNavigatorService);
    expect(service).toBeTruthy();
  });
});
