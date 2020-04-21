import { ActivityPlace } from '../../models/ActivityPlace';

export interface IPlaceState {
  places: ActivityPlace[];
  isLoading: boolean;
}

export const initialPlaceState: IPlaceState = {
  places: [],
  isLoading: false
};
