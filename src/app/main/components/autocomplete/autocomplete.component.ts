import { GetActivityPlaces } from './../../store/actions/places.actions';
import { selectPlaces } from './../../store/selectors/places.selectors';
import { IAppState } from '../../../store/state/app.state';
import { ActivityPlacesService } from './../../services/activity-places.service';
import { FormControl, AbstractControl } from '@angular/forms';
import { BehaviorSubject, Subject, iif, of } from 'rxjs';
import { Component, OnInit, Input, OnDestroy, ChangeDetectorRef, AfterContentChecked } from '@angular/core';
import { ActivityPlace } from '../../models/ActivityPlace';
import { map, takeUntil, filter, tap, startWith, switchMap, skipUntil, withLatestFrom, take, takeLast, skip, repeatWhen, skipWhile } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.less']
})
export class AutocompleteComponent implements OnInit, OnDestroy, AfterContentChecked {

  @Input() control: AbstractControl;

  @Input() label = '';

  places: ActivityPlace[] = [];

  places$ = this.store.pipe(select(selectPlaces));

  selectedPlace$ = new BehaviorSubject<ActivityPlace>(null);

  onDestroy$ = new Subject();
  marker: google.maps.Marker;

  constructor(private store: Store<IAppState>, private placeService: ActivityPlacesService, private cnahgeDetector: ChangeDetectorRef) { }
  ngAfterContentChecked(): void {
    this.cnahgeDetector.detectChanges();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  ngOnInit(): void {
    this.store.dispatch(new GetActivityPlaces());

    this.placeService.searchResult$.next([]);
    this.placeService.searchResult$.pipe(
      filter((places) => places.length > 0),
      takeUntil(this.onDestroy$)).
      subscribe(places => this.places = places);

    this.selectedPlace$.pipe(
      filter(place => place != null),
      withLatestFrom(this.placeService.provider$),
      map(([place]) => place),
      takeUntil(this.onDestroy$),
      ).subscribe((place) => {

        if (this.placeService.map !== undefined && place !== null) {

          if (this.marker === undefined) {

            this.marker = new google.maps.Marker({
              position: place,
              map: this.placeService.map,
              title: ''
            });

          } else {
            this.marker.setMap(this.placeService.map);
          }
          this.placeService.map.setCenter(place);

          if (this.placeService.map.getZoom() > 15) {
            this.placeService.map.setZoom(15);
          }

          this.control.setValue(place.placeId);
        } else if (this.marker !== undefined) {
          this.marker.setMap(null);
        }
    });

    this.placeService.provider$.pipe(
      filter((item) => item != null && this.control.value.length > 0 ),
      takeUntil(this.onDestroy$),
      switchMap(() => this.places$),
      map(places => places.find(p => p.placeId === this.control.value))

      ).
      subscribe(place => {
      if (place !== null && place !== undefined) {
        this.selectedPlace$.next(place);
      } else {
        this.control.setValue('');
      }
    });

    this.control.valueChanges
    .pipe(
     map((queryStr) => {
       if (this.places && this.places.length > 0) {
         const place = this.places.find(p => p.placeId === queryStr);
         if (place !== null && place !== undefined) {
           return place.formattedAddress;
         }
       }
       return  queryStr;
     }),
     takeUntil(this.onDestroy$)).subscribe(
      (query) => this.placeService.serarch$(query)
     );
  }

  changePlace(e: Event) {
    this.selectedPlace$.next(null);
    this.control.setValue('');
  }

  add(item: ActivityPlace) {
    this.places$.pipe(
      switchMap((places) => !places.some(p => p.placeId === item.placeId) ? this.placeService.add$(item) : of(item))).
      subscribe((place) => {
       this.selectedPlace$.next(place);
    });
  }

}
