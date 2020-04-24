import { LogType } from './../../shared/logger/models/LogType';

import { LoggerService } from './../../shared/logger/services/logger.service';
import { selectIsLoggedIn } from './../store/selectors/login.selectors';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IAppState } from 'src/app/store/state/app.state';
import { Store, select } from '@ngrx/store';
import { SignIn } from '../store/actions/login.actions';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit, OnDestroy {

  signinForm: FormGroup;
  loggedIn$ = this.store.pipe(select(selectIsLoggedIn));
  onDestroy$ = new Subject();

  constructor(
    private fb: FormBuilder,
    private store: Store<IAppState>,
    private logging: LoggerService,
    private router: Router) { }
  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  ngOnInit(): void {
    this.signinForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.loggedIn$.pipe(takeUntil(this.onDestroy$)).subscribe((isLoggedIn) => {
      if (isLoggedIn) {
       // this.router.navigate(['/']);
       this.logging.log(LogType.Information , 'user  logged in');
      }
    });
  }


  signInWithGoogle(): void {

    this.store.dispatch(new SignIn());
  }


}
