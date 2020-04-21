
import { IPlaceState } from './../state/places.state';

import { PlaceActions, EActivityPlaceActions } from '../actions/places.actions';
import { initialPlaceState } from '../state/places.state';

export const placeReducer = (
   state = initialPlaceState,
   action: PlaceActions
   ): IPlaceState => {
     switch (action.type) {
      case EActivityPlaceActions.RecivedActivitiePlaces: {
        return {
          ...state,
          places: action.payload,
          isLoading: false
        };
      }
      case EActivityPlaceActions.RecivedActivityPlace: {
        return {
          ...state,
          places: [...state.places, action.payload],
          isLoading: false
        };
      }
      case EActivityPlaceActions.GetActivityPlaces:
      case EActivityPlaceActions.GetActivityPlace: {
        return {
          ...state,
          isLoading: true
        };
      }
      default:
        return state;
     }
   };
