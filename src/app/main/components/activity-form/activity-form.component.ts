
import { ActivityFirebaseService } from './../../services/activity-firebase.service';
import { ActivityPlacesService } from './../../services/activity-places.service';
import { catchError, take } from 'rxjs/operators';
import { LogType } from '../../../shared/logger/models/LogType';
import { LoggerService } from '../../../shared/logger/services/logger.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Activity } from '../../models/Activity';
import { Observable, Subject, BehaviorSubject, of, iif } from 'rxjs';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';
import { ActivityPlace } from '../../models/ActivityPlace';

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

  places: Array<ActivityPlace> = [];

  constructor(
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
    this.form.setValue(this.model$.value);


  }



  onMapReady(map: google.maps.Map) {
    this.placeService.init(map);
  }

  send() {


    const activity: Activity = { ...this.form.value };


    ( activity.id.length > 1 ? this.activityService.update$(activity) : this.activityService.add$(activity)).pipe(
      catchError((err) => {
        this.logger.log(LogType.Error, err, {
        url: '',
        requestPath: '',
        elapsedTime: moment().toLocaleString(),
        userId: null,
        appVersion: '',
        environment: environment.production ? 'prod' : 'dev'
      });
        return of(null) ;
    }),
      take(1)
    ).subscribe((data) => {
      if (data !== null) {
          this.model$.next(null);
          this.logger.log(LogType.Information, data as any, {
            url: '',
            requestPath: '',
            elapsedTime: moment().toLocaleString(),
            userId: null,
            appVersion: '',
            environment: environment.production ? 'prod' : 'dev'
          });
        }
    });





  }


}
