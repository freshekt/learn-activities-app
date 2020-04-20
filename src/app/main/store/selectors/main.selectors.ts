import { IMainState } from './../state/main.state';
import { IAppState } from '../../../store/state/app.state';
import { createSelector } from '@ngrx/store';
import { Activity } from '../../models/Activity';

export const selectLogin = (state: IAppState) => state.main ;

export const selectActivities = createSelector(
  selectLogin,
  (state: IMainState): Activity[] => state.activties
);

export const selectIsLoading = createSelector(
  selectLogin,
  (state: IMainState) => state.isLoading
);
