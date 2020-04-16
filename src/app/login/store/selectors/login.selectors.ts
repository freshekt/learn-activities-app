import { IUser } from './../../models/IUser';
import { ILoginState } from './../state/login.state';
import { IAppState } from 'src/app/store/state/app.state';
import { createSelector } from '@ngrx/store';

export const selectLogin = (state: IAppState) => state.login;

export const selectUser = createSelector(
  selectLogin,
  (state: ILoginState): IUser => state.user
);

export const selectIsLoggedIn = createSelector(
  selectLogin,
  (state: ILoginState) => state.loggedIn
);
