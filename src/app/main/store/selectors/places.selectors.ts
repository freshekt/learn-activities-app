
import { IAppState } from '../../../store/state/app.state';
import { createSelector } from '@ngrx/store';
import { IPlaceState } from '../state/places.state';
import { ActivityPlace } from '../../models/ActivityPlace';

export const selectPlace = (state: IAppState) => state.places ;

export const selectPlaces = createSelector(
  selectPlace,
  (state: IPlaceState): ActivityPlace[] => state.places
);

export const selectIsLoading = createSelector(
  selectPlace,
  (state: IPlaceState) => state.isLoading
);
