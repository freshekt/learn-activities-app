import { selectUser } from './../../../login/store/selectors/login.selectors';
import { selectActivities } from './../selectors/main.selectors';
import { EActivityActions, RecivedActivity, GetActivity, GetActivities, RecivedActivities,
   UpdateActivity, DeleteActivity } from './../actions/main.actions';
import { ActivityFirebaseService } from './../../services/activity-firebase.service';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { IAppState } from 'src/app/store/state/app.state';
import { CreateActivity } from '../actions/main.actions';
import { Activity } from '../../models/Activity';
import { switchMap, withLatestFrom,  map } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainEffects {
  @Effect()
  create$ = this.actions$.pipe(
    ofType<CreateActivity>(EActivityActions.CreateActivity),
    map(data => data.payload),
    switchMap((data) => this.activityService.add$(data)),
    switchMap((data: Activity) => of(new RecivedActivity(data)))
  );


  @Effect()
  get$ = this.actions$.pipe(
    ofType<GetActivity>(EActivityActions.GetActivity),
    map(data => data.payload),
    withLatestFrom(this.store.pipe(select(selectActivities))),
    map(([id, items]) => items.find(s => s.id === id)),
    switchMap(activity => of(new RecivedActivity(activity)))
  );


  @Effect()
  getAll$ = this.actions$.pipe(
    ofType<GetActivities>(EActivityActions.GetListActivity),
    switchMap(() => this.activityService.getAll$()),
    withLatestFrom(this.store.pipe(select(selectUser))),
    map(([data, user]) => data.filter(s => s.userId === user.id)),
    switchMap(data => of(new RecivedActivities(data)))
  );

  @Effect()
  update$ = this.actions$.pipe(
    ofType<UpdateActivity>(EActivityActions.UpdateActivity),
    map(data => data.payload),
    switchMap((data) => this.activityService.update$(data)),
    switchMap((data) => of(new RecivedActivity(data)))
  );

  @Effect()
  delete$ = this.actions$.pipe(
    ofType<DeleteActivity>(EActivityActions.DeleteActivity),
    map(data => data.payload),
    switchMap((data) => this.activityService.remove$(data).pipe(map(() => data))),
    withLatestFrom(this.store.pipe(select(selectActivities))),
    switchMap(([activity, data]) => of(new RecivedActivities(data.filter(s => s.id !== activity.id))))
  );


  constructor(
    private actions$: Actions,
    private store: Store<IAppState>,
    private activityService: ActivityFirebaseService
  ) {}
}
