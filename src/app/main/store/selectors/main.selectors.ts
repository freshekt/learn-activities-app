import { IMainState } from './../state/main.state';
import { IAppState } from '../../../store/state/app.state';
import { createSelector } from '@ngrx/store';
import { Activity } from '../../models/Activity';

export const selectMain = (state: IAppState) => state.main ;

export const selectActivities = createSelector(
  selectMain,
  (state: IMainState): Activity[] => state.activties
);

export const selectIsLoading = createSelector(
  selectMain,
  (state: IMainState) => state.isLoading
);
