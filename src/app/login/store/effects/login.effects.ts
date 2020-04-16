import { IUser } from './../../models/IUser';
import { ELoginActions, SignInSuccess, SignOut, SignOutSuccess } from './../actions/login.actions';
import { Injectable } from '@angular/core';
import {Effect, ofType, Actions} from '@ngrx/effects';
import { IAppState } from 'src/app/store/state/app.state';
import { Store, select } from '@ngrx/store';
import { SignIn } from '../actions/login.actions';
import { switchMap, withLatestFrom } from 'rxjs/operators';
import { selectUser } from '../selectors/login.selectors';
import { from, of } from 'rxjs';
import { LoginService } from '../../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class LoginEffects {

  @Effect()
  signIn$ = this.actions$.pipe(
    ofType<SignIn>(ELoginActions.SignIn),
    withLatestFrom(this.store.pipe(select(selectUser))),
    switchMap(() => this.loginService.signIn$()),
    switchMap( (user: IUser ) => of(new SignInSuccess(user)))
  );

  @Effect()
  signOut$ = this.actions$.pipe(
    ofType<SignOut>(ELoginActions.SignOut),
    switchMap(() => from(this.loginService.signOut$())),
    switchMap(() => of(new SignOutSuccess()))
  );

  constructor(
    private actions$: Actions,
    private store: Store<IAppState>,
    private loginService: LoginService
  ){}

}
