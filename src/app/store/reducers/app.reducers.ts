import { ActionReducerMap } from '@ngrx/store';
import { IAppState } from '../state/app.state';
import { loginReducer } from '../../login/store/reducers/login.reducers';

export const appReducers: ActionReducerMap<IAppState, any> = {
  login: loginReducer
};

