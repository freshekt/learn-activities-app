import { query } from '@angular/animations';
import { ActivityPlacesService } from './../../services/activity-places.service';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { IAppState } from 'src/app/store/state/app.state';
import { switchMap, withLatestFrom,  map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { EActivityPlaceActions, DeleteActivityPlace, RecivedActivityPlace, CreateActivityPlace,
   GetActivityPlace, GetActivityPlaces, RecivedActivitiePlaces, UpdateActivityPlace, SearchPlaces } from '../actions/places.actions';
import { ActivityPlace } from '../../models/ActivityPlace';
import { selectPlaces } from '../selectors/places.selectors';

@Injectable({
  providedIn: 'root'
})
export class PlaceEffects {
  @Effect()
  create$ = this.actions$.pipe(
    ofType<CreateActivityPlace>(EActivityPlaceActions.CreateActivityPlace),
    map(data => data.payload),
    switchMap((data) => this.placeService.add$(data)),
    switchMap((data: ActivityPlace) => of(new RecivedActivityPlace(data)))
  );


  @Effect()
  get$ = this.actions$.pipe(
    ofType<GetActivityPlace>(EActivityPlaceActions.GetActivityPlace),
    map(data => data.payload),
    withLatestFrom(this.store.pipe(select(selectPlaces))),
    map(([id, items]) => items.find(s => s.id === id)),
    switchMap(activity => of(new RecivedActivityPlace(activity)))
  );


  @Effect()
  getAll$ = this.actions$.pipe(
    ofType<GetActivityPlaces>(EActivityPlaceActions.GetActivityPlaces),
    switchMap(() => this.placeService.getAll$()),
    switchMap(data => of(new RecivedActivitiePlaces(data)))
  );

  @Effect()
  update$ = this.actions$.pipe(
    ofType<UpdateActivityPlace>(EActivityPlaceActions.UpdateActivityPlace),
    map(data => data.payload),
    switchMap((data) => this.placeService.update$(data)),
    switchMap((data) => of(new RecivedActivityPlace(data)))
  );

  @Effect()
  delete$ = this.actions$.pipe(
    ofType<DeleteActivityPlace>(EActivityPlaceActions.DeleteActivityPlace),
    map(data => data.payload),
    switchMap((data) => this.placeService.remove$(data).pipe(map(() => data))),
    withLatestFrom(this.store.pipe(select(selectPlaces))),
    switchMap(([place, data]) => of(new RecivedActivitiePlaces(data.filter(s => s.id !== place.id))))
  );

  @Effect()
  search$ = this.actions$.pipe(
    ofType<SearchPlaces>(EActivityPlaceActions.SearchPlaces),
    map(data =>{
      console.log(data);
      return data.payload; }),
    switchMap((query) => {
      console.log({query});
      return this.placeService.serarch(query);
      }),
    switchMap(() => this.placeService.searchResult$),
    switchMap((results) => of(new RecivedActivitiePlaces(results)))
  );


  constructor(
    private actions$: Actions,
    private store: Store<IAppState>,
    private placeService: ActivityPlacesService
  ) {}
}
