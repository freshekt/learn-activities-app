import { GetActivityPlaces } from './../../store/actions/places.actions';
import { selectPlaces } from './../../store/selectors/places.selectors';
import { IAppState } from './../../../store/state/app.state';

import { ActivityFirebaseService } from './../../services/activity-firebase.service';
import { ActivityPlacesService } from './../../services/activity-places.service';
import { catchError, take, takeUntil, withLatestFrom, find, map, filter } from 'rxjs/operators';
import { LogType } from '../../../shared/logger/models/LogType';
import { LoggerService } from '../../../shared/logger/services/logger.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Activity } from '../../models/Activity';
import { Observable, Subject, BehaviorSubject, of, iif } from 'rxjs';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';
import { ActivityPlace } from '../../models/ActivityPlace';
import { Store, select } from '@ngrx/store';


@Component({
  selector: 'app-activity-form',
  templateUrl: './activity-form.component.html',
  styleUrls: ['./activity-form.component.less']
})
export class ActivityFormComponent implements OnInit, OnDestroy {

  opened = true;
  title = 'Activity';
  @Input() start = moment().format('L');
  @Input() model$: BehaviorSubject<Activity>;
  activity$: Observable<Activity>;
  form: FormGroup;
  onDestroy$ = new Subject();
  places$ = this.store.pipe(select(selectPlaces));
  selectedPlace$ = new BehaviorSubject<ActivityPlace>(null);
  places: Array<ActivityPlace> = [];

  constructor(
    private store: Store<IAppState>,
    private placeService: ActivityPlacesService,
    private activityService: ActivityFirebaseService,
    private logger: LoggerService) {
    this.form = new FormGroup({
      id: new FormControl(''),
      title: new FormControl(''),
      start: new FormControl(),
      end: new FormControl(),
      placeId: new FormControl(),
      userId: new FormControl(),
      description: new FormControl()
    });
   }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  ngOnInit(): void {
    this.store.dispatch(new GetActivityPlaces());
    this.form.setValue(this.model$.value);
    this.places$.pipe(takeUntil(this.onDestroy$))
    .subscribe((places) => {
      this.places = places;
    });
    this.form.controls.placeId.valueChanges.
    pipe(
      withLatestFrom(this.places$),
      map(([placeId, places]) => places.find(s => s.placeId === placeId)),
      filter(place => place !== null && place !== undefined),
      takeUntil(this.onDestroy$)
      ).
      subscribe((place) => this.selectedPlace$.next(place));
  }

  onMapReady(map: google.maps.Map) {
    this.placeService.init(map);
    this.selectedPlace$.pipe(takeUntil(this.onDestroy$)).
    subscribe(place => {
      map.setCenter(place);
      if (map.getZoom() > 15) {
        map.setZoom(15);
      }
    });
  }

  send() {
    const activity: Activity = { ...this.form.value };
    ( activity.id.length > 0 ? this.activityService.update$(activity) : this.activityService.add$(activity)).pipe(
      catchError((err) => {
        this.logger.log(LogType.Error, err);
        return of(null) ;
    }),
      take(1)
    ).subscribe((data) => {
      if (data !== null) {
          this.model$.next(null);
          this.logger.log(LogType.Information, `save activity ${data.title}`);
        }
    });





  }


}
