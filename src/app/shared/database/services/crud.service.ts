import { filter } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface ICrudService<T, TKey> {

   get$(id: TKey): Observable<T>;

   getAll$(filter?: any): Observable<T[]>;

   add$(entity: T): Observable<T>;

   update$(entity: T): Observable<T>;

   remove$(entity: T): Observable<void> ;

}
