import { IUser } from './../../models/IUser';

export interface ILoginState {
  user: IUser;
  loggedIn: boolean;
}

export const initialLoginState: ILoginState = {
  user: null,
  loggedIn: false
};
