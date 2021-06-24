import {TestBed} from '@angular/core/testing';

import {PacksService} from './packs.service';

describe('PacksService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PacksService = TestBed.get(PacksService);
    expect(service).toBeTruthy();
  });
});
