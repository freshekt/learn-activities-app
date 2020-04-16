import { initialLoginState } from '../../login/store/state/login.state';
import {RouterReducerState } from '@ngrx/router-store';
import { ILoginState } from 'src/app/login/store/state/login.state';

export interface IAppState {
  router?: RouterReducerState;
  login: ILoginState;
}

export const initialAppState: IAppState = {
  login: initialLoginState
};

export function getIntialState(): IAppState {
  return initialAppState;
}
