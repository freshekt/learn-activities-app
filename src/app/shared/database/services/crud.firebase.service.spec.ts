import { ActivityFirebaseService } from './../../../main/services/activity-firebase.service';
import { DatabaseModule } from './../database.module';
import { TestBed } from '@angular/core/testing';

import { CrudFirebaseService } from './crud.firebase.service';
import { Activity } from 'src/app/main/models/Activity';

describe('Crud.FirebaseService', () => {
  let service: CrudFirebaseService<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
       DatabaseModule
      ]
    });
    service = TestBed.inject(ActivityFirebaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
