import { AngularFireDatabase } from '@angular/fire/database';
import { CrudFirebaseService } from './../../shared/database/services/crud.firebase.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { ActivityPlace } from '../models/ActivityPlace';


@Injectable({
  providedIn: 'root'
})
export class ActivityPlacesService extends CrudFirebaseService<ActivityPlace> {

  provider: google.maps.places.PlacesService;

  searchResult$ = new BehaviorSubject<Array<ActivityPlace>>([]);

  constructor(db: AngularFireDatabase) {
    super('/places', db);
    this.provider = new google.maps.places.PlacesService(document.createElement('div'));
  }


  serarch(query: string): Observable<ActivityPlace[]> {
      console.log({query});
      this.provider.textSearch({query}, (results: google.maps.places.PlaceResult[]) => {
        console.log({results});
        this.searchResult$.next(results.map(place => ({
                  lat: place.geometry.location.lat(),
                  lng: place.geometry.location.lng(),
                  name: place.name,
                  id: place.place_id,
                  formattedAddress: place.formatted_address
                })));
        });

        return this.searchResult$.asObservable();
  }


}
