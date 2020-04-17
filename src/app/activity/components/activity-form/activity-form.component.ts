import { LogType } from './../../../shared/logger/models/LogType';
import { LoggerService } from './../../../shared/logger/services/logger.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Activity } from './../../models/Activity';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-activity-form',
  templateUrl: './activity-form.component.html',
  styleUrls: ['./activity-form.component.less']
})
export class ActivityFormComponent implements OnInit {

  opened = true;
  title = 'New Activity';

  activity$: Observable<Activity>;

  form: FormGroup;

  constructor(private logger: LoggerService) {
    this.form = new FormGroup({
      title: new FormControl(''),
      start: new FormControl(),
      end: new FormControl(),
    });
   }

  ngOnInit(): void {
  }

  send(){
    this.logger.log(LogType.Information, this.form.value, {
      url: '',
      requestPath: '',
      elapsedTime: moment().toLocaleString(),
      userId: null,
      appVersion: '',
      environment: environment.production ? 'prod' : 'dev'
    })
  }
}
