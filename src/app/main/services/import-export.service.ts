import { Observable } from 'rxjs';


export interface IImportExportService<T> {
  export(name: string, data: T[]);
  import(file: File): Observable<T[]>;
}
