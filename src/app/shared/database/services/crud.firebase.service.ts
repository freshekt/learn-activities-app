import { IBaseModel } from './../models/IBaseModel';
import { ICrudService } from './crud.service';
import { Observable, from } from 'rxjs';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { map, tap } from 'rxjs/operators';


export class CrudFirebaseService<T extends IBaseModel<string>> implements ICrudService<T, string> {

  entitiesRef: AngularFireList<any>;
  enities: Observable<T[]>;

  constructor(collectionName: string, db: AngularFireDatabase ) {
      this.entitiesRef = db.list(collectionName);
      this.enities = this.entitiesRef.snapshotChanges()
      .pipe(map(changes => changes.map(s => ({...s.payload.val(), id: s.payload.key} as T))));
   }

  get$(id: string): Observable<T> {
    return this.enities.pipe(map(entities => entities.find(s => s.id === id)));
  }
  getAll$(): Observable<T[]> {
    return this.enities;
  }
  add$(entity: T): Observable<T> {
    console.log('add$', entity);
    return from(this.entitiesRef.push(entity)).pipe(tap((data) => console.log('added data', data)), map(() => entity));
  }
  update$(entity: T): Observable<T> {
    return from(this.entitiesRef.update(entity.id, entity)).pipe(map(() => entity));
  }
  remove$(entity: T): Observable<void> {
    return from(this.entitiesRef.remove(entity.id));
  }
}
