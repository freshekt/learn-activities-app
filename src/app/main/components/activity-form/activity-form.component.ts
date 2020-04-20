import { selectUser } from './../../../login/store/selectors/login.selectors';
import { LogType } from '../../../shared/logger/models/LogType';
import { LoggerService } from '../../../shared/logger/services/logger.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Activity } from '../../models/Activity';
import { Observable } from 'rxjs';
import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';
import { Store, select } from '@ngrx/store';
import { IAppState } from '../../../store/state/app.state';
import { GetUser } from 'src/app/login/store/actions/login.actions';

@Component({
  selector: 'app-activity-form',
  templateUrl: './activity-form.component.html',
  styleUrls: ['./activity-form.component.less']
})
export class ActivityFormComponent implements OnInit {

  opened = true;
  title = 'New Activity';
  @Input() userId: string;
  @Input() start = moment().format('L');
  activity$: Observable<Activity>;

  form: FormGroup;

  constructor(private store: Store<IAppState>, private logger: LoggerService) {
    this.form = new FormGroup({
      title: new FormControl(''),
      start: new FormControl(),
      end: new FormControl(),
    });
   }

  ngOnInit(): void {
    this.form.setValue({
      title: '',
      start: this.start,
      end: null
    });
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
    })
  }
}
