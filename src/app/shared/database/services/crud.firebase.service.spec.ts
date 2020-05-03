import { ActivityPlacesService } from './../../../main/services/activity-places.service';
import { ActivityFirebaseService } from './../../../main/services/activity-firebase.service';
import { DatabaseModule } from './../database.module';
import { TestBed, fakeAsync, tick, async, flushMicrotasks } from '@angular/core/testing';

import { CrudFirebaseService } from './crud.firebase.service';
import { Activity } from 'src/app/main/models/Activity';
import { take, filter, switchMap, catchError, takeLast,  takeUntil, withLatestFrom, tap, takeWhile } from 'rxjs/operators';
import { BehaviorSubject, concat, throwError, Subject, Observable, of } from 'rxjs';
import * as moment from 'moment';
import { AngularFireDatabase, AngularFireList, ChildEvent, SnapshotAction } from '@angular/fire/database';
import { FirebaseOperation } from '@angular/fire/database/interfaces';

describe('CrudFirebaseService', () => {
  const dataList: Array<Activity> = [
    {
    id: '1',
    title: 'test@1',
    start: '',
    end: '',
    description: '',
    userId: '1',
    placeId: '1',
  }, {
    id: '2',
    title: 'test@2',
    start: '',
    end: '',
    description: '',
    userId: '1',
    placeId: '1',
  }];
  let service: CrudFirebaseService<any>;
  const activity$ = new BehaviorSubject<Activity>(null);
  const testMethod$ = new BehaviorSubject<number>(0);
  const dbprovider = {
    list: jasmine.createSpy('list').and.callFake(() => ({
      valueChanges: jasmine.createSpy('valueChanges').and.callFake(() => of(dataList)),
      snapshotChanges: jasmine.createSpy('snapshotChanges').and.callFake(() => {
        console.log('list request');
        return of(dataList.map((s: Activity, i ) => ({
        payload: {
          key: s.id,
          val: () => s
        }
      } as SnapshotAction<Activity>))); }),
      stateChanges: jasmine.createSpy('stateChanges').and.callFake(() => of(dataList.map((s, i ) => ({
        payload: {
          key: s.id,
          val: () => s
        }
      } as SnapshotAction<Activity> ))[0])),
      update: jasmine.createSpy('update').and.callFake((item: FirebaseOperation, data: Partial<Activity>): Promise<void> => {
        const entityId: string = (data as Activity).id;
        const index: number = dataList.findIndex(s => s.id === entityId);
        dataList.values[index] =  data;
        return Promise.resolve(); }),
      set: jasmine.createSpy('set').and.callFake((item: FirebaseOperation, data: any): Promise<void> => Promise.resolve()),
      push: jasmine.createSpy('push').and.callFake((data: any): any => Promise.resolve(data)),
      remove: jasmine.createSpy('push').and.callFake((item?: FirebaseOperation): Promise<void> => {
        console.log('remove', {item});
        dataList.splice(dataList.findIndex(s => s.id === item), 1);
        return Promise.resolve();
      })
    }))
  };

  let originalTimeout: number;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
      // DatabaseModule
      ],
      providers: [
        {
          provide: AngularFireDatabase,
          useValue: dbprovider
        }
      ]
    });
    service = TestBed.inject(ActivityFirebaseService);
    service.prepareList();
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 25000;
  });

  afterEach(() => {
     jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
   });

  it(' curd service should be created', () => {
    expect(service).toBeTruthy();
  });

  it(' should create entity', (done: DoneFn) => {

    service.add$(dataList[0]).subscribe((data) => {
      console.log(' should create entity response', {data});
      activity$.next(data);
      testMethod$.next(1);
      expect(data.title).toEqual('test@1');
      done();

    });
  });

  it(' should get entity',  (done: DoneFn) => {
    let data: any;

    service.get$(dataList[0].id).pipe(take(1))
    .subscribe((d: any) => {
      console.log(' should get entity response ', {data});
      data = d;
      expect(data.userId).toEqual(dataList[0].userId);
      done();
      testMethod$.next(2);
    });
  })  ;

  it(' should update entity',  (done: DoneFn) => {
     let data: any = dataList[0];
     service.update$({ ...data, title: 'test@2' })

        .subscribe((d) => {
          console.log(' should update entity response ', {d});
          data = d;
          expect(data.title).toEqual('test@2');
          done();
          testMethod$.next(3);

         // flushMicrotasks();

        });
    });

  it(' should delete entity',  (done: DoneFn) => {
      const removeId = dataList[1].id;

      service.remove$(dataList[1]).pipe(
        switchMap(() => service.get$(removeId))
      )
      .subscribe((d) => {
        console.log(' should delete entity response ', {d});
        expect(undefined).toEqual(d);
        done();
      });
    });

});
