import { query } from '@angular/animations';
import { AngularFireDatabase } from '@angular/fire/database';
import { CrudFirebaseService } from './../../shared/database/services/crud.firebase.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { ActivityPlace } from '../models/ActivityPlace';


@Injectable({
  providedIn: 'root'
})
export class ActivityPlacesService extends CrudFirebaseService<ActivityPlace> {

  provider = new BehaviorSubject<google.maps.places.PlacesService>(null);

  searchResult$ = new BehaviorSubject<Array<ActivityPlace>>([]);

  constructor(db: AngularFireDatabase) {
    super('/places', db);
  }

  init(map: google.maps.Map) {
    this.provider.next(new google.maps.places.PlacesService(map));
  }

  serarch$(query: string): Observable<ActivityPlace[]> {
     if (query && query.length > 0) {
      this.searchResult$.next([]);
      this.provider.value.textSearch({query}, (results: google.maps.places.PlaceResult[]) => {
        if (results !== null) {
          console.log();
          this.searchResult$.next(results.map(place => ({
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng(),
                name: place.name,
                id: place.id,
                place_id: place.place_id,
                formattedAddress: place.formatted_address
              })));
            }
        });

      }

     return this.searchResult$.asObservable();
  }


}
