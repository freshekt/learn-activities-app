import { takeUntil } from 'rxjs/operators';
import { SearchPlaces } from './../../store/actions/places.actions';
import { selectUser } from './../../../login/store/selectors/login.selectors';
import { LogType } from '../../../shared/logger/models/LogType';
import { LoggerService } from '../../../shared/logger/services/logger.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Activity } from '../../models/Activity';
import { Observable, Subject } from 'rxjs';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';
import { Store, select } from '@ngrx/store';
import { IAppState } from '../../../store/state/app.state';
import { GetUser } from 'src/app/login/store/actions/login.actions';
import { selectPlaces } from '../../store/selectors/places.selectors';
import { query } from '@angular/animations';

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
  form: FormGroup;
  onDestroy$ = new Subject();

  constructor(private store: Store<IAppState>, private logger: LoggerService) {
    this.form = new FormGroup({
      title: new FormControl(''),
      start: new FormControl(),
      end: new FormControl(),
      placeId: new FormControl()
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
      placeId: null
    });

    this.form.controls['placeId'].valueChanges
     .pipe(takeUntil(this.onDestroy$)).subscribe(
       (query) => this.store.dispatch(new SearchPlaces(query))
     );
  }

  send() {
    const activity: Activity = {...this.form.value, userId: this.userId};
    this.logger.log(LogType.Information, activity as any, {
      url: '',
      requestPath: '',
      elapsedTime: moment().toLocaleString(),
      userId: null,
      appVersion: '',
      environment: environment.production ? 'prod' : 'dev'
    });
  }


}
