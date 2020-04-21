import { ActivityPlace } from '../../models/ActivityPlace';
import { Action } from '@ngrx/store';


export enum EActivityPlaceActions {
  CreateActivityPlace = '[ActivityPlace] Create activity place',
  UpdateActivityPlace = '[ActivityPlace] Update activity place',
  RecivedActivityPlace = '[ActivityPlace] Recived activity place',
  DeleteActivityPlace = '[ActivityPlace] Delete activity place',
  RecivedActivitiePlaces = '[ActivityPlaces] recived activity places',
  GetActivityPlace = '[ActivityPlace] Get activity place',
  GetActivityPlaces = '[ActivityPlaces] Get All activity places',
  SearchPlaces = '[SearchPlaces] Search activity places'

}

export class CreateActivityPlace implements Action {
  public readonly type = EActivityPlaceActions.CreateActivityPlace;
  constructor(public payload: ActivityPlace) {}
}

export class UpdateActivityPlace implements Action {
  public readonly type = EActivityPlaceActions.UpdateActivityPlace;
  constructor(public payload: ActivityPlace) {}
}

export class RecivedActivityPlace implements Action {
  public readonly type = EActivityPlaceActions.RecivedActivityPlace;
  constructor(public payload: ActivityPlace) {}
}

export class DeleteActivityPlace implements Action {
  public readonly type = EActivityPlaceActions.DeleteActivityPlace;
  constructor(public payload: ActivityPlace) {}
}

export class RecivedActivitiePlaces implements Action {
  public readonly type = EActivityPlaceActions.RecivedActivitiePlaces;
  constructor(public payload: ActivityPlace[]) {}
}

export class GetActivityPlace implements Action {
  public readonly type = EActivityPlaceActions.GetActivityPlace;
  constructor(public payload: string) {}
}

export class GetActivityPlaces implements Action {
  public readonly type = EActivityPlaceActions.GetActivityPlaces;
}

export class SearchPlaces implements Action {
  public readonly type = EActivityPlaceActions.SearchPlaces;
  constructor(public payload: string) { }
}


export type PlaceActions =
CreateActivityPlace | UpdateActivityPlace | RecivedActivityPlace |
DeleteActivityPlace | RecivedActivitiePlaces | GetActivityPlace | GetActivityPlaces | SearchPlaces;


