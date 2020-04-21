import { TestBed } from '@angular/core/testing';

import { ActivityPlacesService } from './activity-places.service';

describe('ActivityPlacesService', () => {
  let service: ActivityPlacesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActivityPlacesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
