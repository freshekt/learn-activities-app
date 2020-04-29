import { DatabaseModule } from './../../shared/database/database.module';
import { TestBed } from '@angular/core/testing';

import { ActivityPlacesService } from './activity-places.service';
declare var google: any;
describe('ActivityPlacesService', () => {
  let service: ActivityPlacesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        DatabaseModule
      ]});
    service = TestBed.inject(ActivityPlacesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
