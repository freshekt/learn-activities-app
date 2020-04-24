import { IBaseModel } from './../models/IBaseModel';
import { ICrudService } from './crud.service';
import { Observable, from } from 'rxjs';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { map, tap } from 'rxjs/operators';


export class CrudFirebaseService<T extends IBaseModel<string>> implements ICrudService<T, string> {

  entitiesRef: AngularFireList<any>;

  constructor(private collectionName: string, private db: AngularFireDatabase ) {

   }

  prepareList(filter?) {
    this.entitiesRef = this.db.list(this.collectionName, filter);
    return this.entitiesRef.snapshotChanges()
    .pipe(map(changes => changes.map(s => ({...s.payload.val(), id: s.payload.key} as T))));
  }

  get$(id: string): Observable<T> {
    return this.prepareList().pipe(map(entities => entities.find(s => s.id === id)));
  }
  getAll$(filter?): Observable<T[]> {
    return this.prepareList(filter);
  }
  add$(entity: T): Observable<T> {
    if (this.entitiesRef === undefined)
    {
      this.prepareList();
    }
    return from(this.entitiesRef.push(entity)).pipe(tap((data) => console.log('added data', data)), map(() => entity));
  }
  update$(entity: T): Observable<T> {
    if (this.entitiesRef === undefined)
    {
      this.prepareList();
    }
    return from(this.entitiesRef.update(entity.id, entity)).pipe(map(() => entity));
  }
  remove$(entity: T): Observable<void> {
    if (this.entitiesRef === undefined)
    {
      this.prepareList();
    }
    return from(this.entitiesRef.remove(entity.id));
  }
}
