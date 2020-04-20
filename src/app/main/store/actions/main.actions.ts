
import { Activity } from './../../models/Activity';
import { Action } from '@ngrx/store';

export enum EActivityActions {
  CreateActivity = '[Activity] Create activity',
  UpdateActivity = '[Activity] Update activity',
  RecivedActivity = '[Activity] Recived activity',
  DeleteActivity = '[Activity] Delete activity',
  RecivedActivities = '[Activities] recived activity',
  GetActivity = '[Activity] Get activity',
  GetListActivity = '[Activities] Get All activities',

}

export class CreateActivity implements Action {
  public readonly type = EActivityActions.CreateActivity;
  constructor(public payload: Activity) {}
}

export class UpdateActivity implements Action {
  public readonly type = EActivityActions.UpdateActivity;
  constructor(public payload: Activity) {}
}

export class RecivedActivity implements Action {
  public readonly type = EActivityActions.RecivedActivity;
  constructor(public payload: Activity) {}
}

export class DeleteActivity implements Action {
  public readonly type = EActivityActions.DeleteActivity;
  constructor(public payload: Activity) {}
}

export class RecivedActivities implements Action {
  public readonly type = EActivityActions.RecivedActivities;
  constructor(public payload: Activity[]) {}
}

export class GetActivity implements Action {
  public readonly type = EActivityActions.GetActivity;
  constructor(public payload: string) {}
}

export class GetActivities implements Action {
  public readonly type = EActivityActions.GetListActivity;
}


export type MainActions =
CreateActivity | UpdateActivity | RecivedActivity | DeleteActivity | RecivedActivities | GetActivity | GetActivities;
