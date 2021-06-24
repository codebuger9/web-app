import {TestBed} from '@angular/core/testing';

import {PostNavigatorService} from './postNavigator.service';

describe('PostNavigatorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PostNavigatorService = TestBed.get(PostNavigatorService);
    expect(service).toBeTruthy();
  });
});
