import { Activity } from './../models/Activity';
import { CrudFirebaseService } from './../../shared/database/services/crud.firebase.service';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ActivityFirebaseService  extends CrudFirebaseService<Activity> {

  constructor(db: AngularFireDatabase) {
    super( '/activities', db);
   }


}
