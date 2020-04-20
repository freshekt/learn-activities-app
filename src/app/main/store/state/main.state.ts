import { Activity } from '../../models/Activity';

export interface IMainState {
  activties: Activity[];
  isLoading: boolean;
}


export const initialMainState: IMainState = {
  activties: [],
  isLoading: false
};
