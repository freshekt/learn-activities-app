import { ActivityFirebaseService } from './../../../main/services/activity-firebase.service';
import { DatabaseModule } from './../database.module';
import { TestBed, fakeAsync } from '@angular/core/testing';

import { CrudFirebaseService } from './crud.firebase.service';
import { Activity } from 'src/app/main/models/Activity';
import { take, filter, switchMap, catchError } from 'rxjs/operators';
import { BehaviorSubject, concat, throwError } from 'rxjs';

describe('CrudFirebaseService', () => {
  let service: CrudFirebaseService<any>;
  const testActivity = new BehaviorSubject<Activity>(null);
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
       DatabaseModule
      ]
    });
    service = TestBed.inject(ActivityFirebaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create activity', (done: DoneFn) => {
    service.add$({
      id: '',
      title: 'test@1',
      start: '',
      end: '',
      description: '',
      userId: '1',
      placeId: '1',
    }).pipe(take(1)).subscribe((data) => {
      testActivity.next(data);
      expect(data.title).toEqual('test@1');
      done();
    });
  });

  it('should get activity', fakeAsync((done: DoneFn) => {
    testActivity.pipe(
      filter(s =>  s !== null),
      switchMap((data: any) => service.get$(data.id)),
      take(1)
      )
    .subscribe((data) => {
      expect(data.userId).toEqual(testActivity.value.userId);
      done();
    });
  }));

  it('should update activity', fakeAsync((done: DoneFn) => {
      testActivity.pipe(filter(s => s !== null), switchMap((data: any) => service.update$({ ...data, title: 'test@2' })), take(1))
        .subscribe((data) => {
          expect(data.title).toEqual('test@2');
          done();
        });
    }));

  it('should delete activity', fakeAsync((done: DoneFn) => {
      testActivity.pipe(
        filter(s =>  s.title === 'test@2'),
        switchMap((data: any) => service.remove$(data)),
        switchMap(() => service.get$(testActivity.value.id)),
        take(1),
        catchError((err, c) => throwError({err}) !== null && c),
        take(1)
      )
      .subscribe((data) => {
        expect(data.title).toEqual('test@2');
        done();
      });
    }));

});
