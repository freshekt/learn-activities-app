import { selectUser } from './../../../login/store/selectors/login.selectors';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivityPlacesService } from './../../services/activity-places.service';
import { GetActivityPlaces } from './../../store/actions/places.actions';
import { LoggerService } from './../../../shared/logger/services/logger.service';
import { IAppState } from './../../../store/state/app.state';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { selectPlaces } from '../../store/selectors/places.selectors';
import { tap, takeUntil, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { ActivityPlace } from '../../models/ActivityPlace';
import { GetUser } from 'src/app/login/store/actions/login.actions';

@Component({
  selector: 'app-places-forms',
  templateUrl: './places-forms.component.html',
  styleUrls: ['./places-forms.component.less']
})
export class PlacesFormsComponent implements OnInit, OnDestroy {

  onDestroy$ = new Subject();

  user$ = this.store.pipe(select(selectUser));

  places$ = this.store.pipe(select(selectPlaces)).pipe(
    withLatestFrom(this.user$),
    map(([places, user]) => places.filter((e) => e.userId === user.id))
  );

  forms: FormGroup[] = [];

  addControl = new FormControl('');



  constructor(private store: Store<IAppState>, private placeService: ActivityPlacesService, private logging: LoggerService) { }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  ngOnInit(): void {
    this.store.dispatch(new GetUser())
    this.store.dispatch(new GetActivityPlaces());
    this.user$
    .pipe(
      withLatestFrom(this.places$),
      tap(([user, places]) => {
        this.forms = [];
        places.forEach(place =>
        this.forms.push(new FormGroup({
            id:  new FormControl(place.id),
            name:  new FormControl(place.name),
            placeId: new FormControl(place.placeId),
            userId: new FormControl(user.id),
            lat: new FormControl(place.lat),
            lng: new FormControl(place.lng),
            formattedAddress: new FormControl(place.formattedAddress)
        })));
      }),
      takeUntil(this.onDestroy$)).
    subscribe(([u,places]) => console.log({places}));
  }

  onMapReady(map: google.maps.Map) {
    this.placeService.init(map);
  }

  update(place: ActivityPlace) {
     this.placeService.update$(place).subscribe();
  }

  remove(place: ActivityPlace) {
    this.placeService.remove$(place).subscribe();
  }

}
