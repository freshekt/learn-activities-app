import { ActivityFirebaseService } from './../../services/activity-firebase.service';
import { query } from '@angular/animations';
import { ActivityPlacesService } from './../../services/activity-places.service';
import { takeUntil, map, filter, switchMap, withLatestFrom } from 'rxjs/operators';
import { SearchPlaces } from './../../store/actions/places.actions';
import { selectUser } from './../../../login/store/selectors/login.selectors';
import { LogType } from '../../../shared/logger/models/LogType';
import { LoggerService } from '../../../shared/logger/services/logger.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Activity } from '../../models/Activity';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';
import { Store, select } from '@ngrx/store';
import { IAppState } from '../../../store/state/app.state';
import { selectPlaces } from '../../store/selectors/places.selectors';
import { ActivityPlace } from '../../models/ActivityPlace';

@Component({
  selector: 'app-activity-form',
  templateUrl: './activity-form.component.html',
  styleUrls: ['./activity-form.component.less']
})
export class ActivityFormComponent implements OnInit, OnDestroy {

  opened = true;
  title = 'New Activity';
  @Input() userId: string;
  @Input() start = moment().format('L');
  activity$: Observable<Activity>;
  places$ = this.store.pipe(select(selectPlaces));
  selectedPlace$ = new BehaviorSubject<ActivityPlace>(null);
  form: FormGroup;
  onDestroy$ = new Subject();

  constructor(
    private store: Store<IAppState>,
    private placeService: ActivityPlacesService,
    private activityService: ActivityFirebaseService,
    private logger: LoggerService) {
    this.form = new FormGroup({
      title: new FormControl(''),
      start: new FormControl(),
      end: new FormControl(),
      placeId: new FormControl(),
      description: new FormControl()
    });
   }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  ngOnInit(): void {
    this.form.setValue({
      title: '',
      start: this.start,
      end: null,
      placeId: null,
      description: ''
    });

    this.places$.pipe(
      withLatestFrom(this.form.controls.placeId.valueChanges),
      map(([places, queryStr] ) => places.find(p => p.id === queryStr)),
      takeUntil(this.onDestroy$)).
      subscribe(place => this.selectedPlace$.next(place));

    this.form.controls.placeId.valueChanges
     .pipe(takeUntil(this.onDestroy$)).subscribe(
       (query) => this.store.dispatch(new SearchPlaces(query))
     );
  }

  changePlace(e: Event) {
      this.selectedPlace$.next(null);
      this.form.setValue({ ...this.form.value, placeId: ''});
  }

  onMapReady(map: google.maps.Map) {
    this.placeService.init(map);
  }

  send() {
   try {

    const activity: Activity = {...this.form.value, userId: this.userId};

    this.placeService.add$(this.selectedPlace$.value).pipe(
      switchMap(() => this.activityService.add$(activity))
    ).subscribe((data) => {
      this.logger.log(LogType.Information, data as any, {
        url: '',
        requestPath: '',
        elapsedTime: moment().toLocaleString(),
        userId: null,
        appVersion: '',
        environment: environment.production ? 'prod' : 'dev'
      });
    });


   } catch (ex) {
    this.logger.log(LogType.Error, ex as any, {
      url: '',
      requestPath: '',
      elapsedTime: moment().toLocaleString(),
      userId: null,
      appVersion: '',
      environment: environment.production ? 'prod' : 'dev'
    });
   }


  }


}
