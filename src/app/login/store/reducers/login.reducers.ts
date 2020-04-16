import { initialLoginState, ILoginState } from '../state/login.state';
import { ELoginActions, LoginActions } from '../actions/login.actions';

export const loginReducer = (
   state = initialLoginState,
   action: LoginActions
   ): ILoginState => {

     switch (action.type) {
      case ELoginActions.SignInSuccess: {
        return {
          ...state,
          user: action.payload,
          loggedIn: action.payload !== null
        };
      }
      case ELoginActions.SignOutSuccess: {
        return {
          ...state,
          user: null,
          loggedIn: false
        };
      }
      default:
        return state;
     }
   };
