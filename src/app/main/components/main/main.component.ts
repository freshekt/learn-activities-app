import { environment } from 'src/environments/environment';
import { LogType } from './../../../shared/logger/models/LogType';
import { IAppState } from '../../../store/state/app.state';
import { selectIsLoggedIn, selectUser } from './../../../login/store/selectors/login.selectors';
import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { GetUser, SignOut } from '../../../login/store/actions/login.actions';
import { LoggerService } from 'src/app/shared/logger/services/logger.service';
import * as moment from 'moment';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.less']
})
export class MainComponent implements OnInit {

  isLoggedIn$ = this.store.pipe(select(selectIsLoggedIn));

  user$ = this.store.pipe(select(selectUser));

  constructor(private store: Store<IAppState>, private logging: LoggerService) { }

  ngOnInit(): void {
    this.store.dispatch(new GetUser());
    this.user$.subscribe((user) => console.log({user}));
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
