import { selectActivities } from './../../store/selectors/main.selectors';
import { GetActivities } from './../../store/actions/main.actions';
import { environment } from 'src/environments/environment';
import { LogType } from '../../../shared/logger/models/LogType';
import { IAppState } from '../../../store/state/app.state';
import { selectIsLoggedIn, selectUser } from '../../../login/store/selectors/login.selectors';
import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { GetUser, SignOut } from '../../../login/store/actions/login.actions';
import { LoggerService } from 'src/app/shared/logger/services/logger.service';
import * as moment from 'moment';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.less']
})
export class ActivitiesComponent implements OnInit {

  isLoggedIn$ = this.store.pipe(select(selectIsLoggedIn));

  user$ = this.store.pipe(select(selectUser));

  events$ = this.store.pipe(select(selectActivities));

  showModal$ = new BehaviorSubject(false);

  options: any;

  selectedDate = moment().format('L');


  constructor(private store: Store<IAppState>, private logging: LoggerService) { }

  ngOnInit(): void {
    this.store.dispatch(new GetUser());
    this.store.dispatch(new GetActivities());

    this.options = {
        plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
        defaultDate: moment().format('YYYY-MM-DD'),
        header: {
            left: 'prev,next',
            center: 'title',
            right: 'month, agendaWeek, agendaDay'
        },
        editable: true,
        dateClick: ({date}) => {
          this.selectedDate = moment(date).format('L');
        }
    };
  }

  signOut() {
    this.logging.log(LogType.Information , 'user  logged in',
          {
            url: '',
            requestPath: '',
            elapsedTime: moment().toLocaleString(),
            userId: null,
            appVersion: '',
            environment: environment.production ? 'prod' : 'dev'
          }
        );
    this.store.dispatch(new SignOut());
  }

}
