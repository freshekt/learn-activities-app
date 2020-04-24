import { tap } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/database';
import { CrudFirebaseService } from './../../shared/database/services/crud.firebase.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { ActivityPlace } from '../models/ActivityPlace';


@Injectable({
  providedIn: 'root'
})
export class ActivityPlacesService extends CrudFirebaseService<ActivityPlace> {

  provider$ = new BehaviorSubject<google.maps.places.PlacesService>(null);

  searchResult$ = new BehaviorSubject<Array<ActivityPlace>>([]);
  map: google.maps.Map<Element>;

  constructor(db: AngularFireDatabase) {
    super('/places', db);
  }

  init(map: google.maps.Map) {
    this.map = map;
    console.log('init map');
    this.provider$.next(new google.maps.places.PlacesService(map));
  }

  serarch$(query: string): Observable<ActivityPlace[]> {
     if (query && query.length > 0) {
      this.searchResult$.next([]);
      this.provider$.value.textSearch({query}, (results: google.maps.places.PlaceResult[]) => {
        if (results !== null) {
          this.searchResult$.next(results.map(place => ({
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng(),
                name: place.name,
                userId: '',
                id: place.id,
                placeId: place.place_id,
                formattedAddress: place.formatted_address
              })));
            }
        });

      }

     return this.searchResult$.asObservable();
  }

  add$(entity: ActivityPlace): Observable<ActivityPlace> {
    return super.add$(entity).pipe(tap(() => this.searchResult$.next([])));
  }

}
