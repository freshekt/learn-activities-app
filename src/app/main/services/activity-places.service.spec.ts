import { DatabaseModule } from './../../shared/database/database.module';
import { TestBed } from '@angular/core/testing';


import { AngularFireDatabase } from '@angular/fire/database/database';
import { ActivityPlacesService } from './activity-places.service';
declare var google: any;
describe('ActivityPlacesService', () => {
  let service: ActivityPlacesService;
 // let  dbprovider = jasmine.createSpyObj<AngularFireDatabase>('AngularFireDatabase', ['list']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        DatabaseModule
      ],
   /* providers: [
      {
        provider: AngularFireDatabase,
        useValue: dbprovider
      }
    ]*/
  });
    service = TestBed.inject(ActivityPlacesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
