
import { IMainState, initialMainState } from './../state/main.state';
import { EActivityActions, MainActions } from '../actions/main.actions';

export const mainReducer = (
   state = initialMainState,
   action: MainActions
   ): IMainState => {
     switch (action.type) {
      case EActivityActions.RecivedActivities: {
        return {
          ...state,
          activties: action.payload,
          isLoading: false
        };
      }
      case EActivityActions.RecivedActivity: {
        return {
          ...state,
          activties: [...state.activties, action.payload],
          isLoading: false
        };
      }
      case EActivityActions.GetListActivity:
      case EActivityActions.GetActivity: {
        return {
          ...state,
          isLoading: true
        };
      }
      default:
        return state;
     }
   };
