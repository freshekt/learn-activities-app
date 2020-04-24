import { LogType } from './../../../shared/logger/models/LogType';
import { selectUser } from './../../../login/store/selectors/login.selectors';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivityPlacesService } from './../../services/activity-places.service';
import { GetActivityPlaces } from './../../store/actions/places.actions';
import { LoggerService } from './../../../shared/logger/services/logger.service';
import { IAppState } from './../../../store/state/app.state';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
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

  @Input() userId;

  private onDestroy$ = new Subject();

  places$ = this.store.pipe(select(selectPlaces));

  forms: FormGroup[] = [];

  addControl = new FormControl('');

  constructor(private store: Store<IAppState>,
     private placeService: ActivityPlacesService,
     private logging: LoggerService
     ) { }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  ngOnInit(): void {
    this.store.dispatch(new GetActivityPlaces());
    this.places$.
    pipe(takeUntil(this.onDestroy$)).
    subscribe((places) => {
      console.log({places});
      this.forms = [];
      places.forEach(place =>
      this.forms.push(new FormGroup({
          id:  new FormControl(place.id),
          name:  new FormControl(place.name),
          placeId: new FormControl(place.placeId),
          userId: new FormControl(this.userId),
          lat: new FormControl(place.lat),
          lng: new FormControl(place.lng),
          formattedAddress: new FormControl(place.formattedAddress)
      })));
    });
  }

  onMapReady(map: google.maps.Map) {
    this.placeService.init(map);
  }

  update(place: ActivityPlace) {
     this.placeService.update$(place).subscribe(() => this.logging.log(LogType.Information, `updated ${place.name}`));
  }

  remove(place: ActivityPlace) {
    this.placeService.remove$(place).subscribe(() => this.logging.log(LogType.Information, `removed ${place.name}`));
  }

}
