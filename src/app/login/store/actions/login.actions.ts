import { Action } from '@ngrx/store';
import { IUser } from '../../models/IUser';

export enum ELoginActions {
  SignIn = '[Login] Sign In',
  SignOut = '[Login] Sign Out',
  SignInSuccess = '[Login] Sign In Success',
  SignOutSuccess = '[Login] Sign Out  Success',
}

export  class SignInSuccess implements Action {
  public readonly type = ELoginActions.SignInSuccess;
  constructor(public payload: IUser) {}
}

export  class SignOutSuccess implements Action {
  public readonly type = ELoginActions.SignOutSuccess;
}

export  class SignOut implements Action {
  public readonly type = ELoginActions.SignOut;
}

export  class SignIn implements Action {
  public readonly type = ELoginActions.SignIn;
}

export type LoginActions = SignInSuccess | SignOutSuccess | SignIn | SignOut ;
