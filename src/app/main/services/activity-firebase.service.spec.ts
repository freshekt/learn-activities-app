import { TestBed } from '@angular/core/testing';

import { ActivityFirebaseService } from './activity-firebase.service';

describe('ActivityFirebaseService', () => {
  let service: ActivityFirebaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActivityFirebaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
