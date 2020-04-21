import { IPlaceState, initialPlaceState } from './../../main/store/state/places.state';
import { initialMainState } from './../../main/store/state/main.state';
import { initialLoginState } from '../../login/store/state/login.state';
import {RouterReducerState } from '@ngrx/router-store';
import { ILoginState } from '../../login/store/state/login.state';
import { IMainState } from 'src/app/main/store/state/main.state';

export interface IAppState {
  router?: RouterReducerState;
  login: ILoginState;
  main: IMainState;
  places: IPlaceState;
}

export const initialAppState: IAppState = {
  login: initialLoginState,
  main: initialMainState,
  places: initialPlaceState
};

export function getIntialState(): IAppState {
  return initialAppState;
}
