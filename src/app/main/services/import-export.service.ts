import { Observable, BehaviorSubject, of } from 'rxjs';
import * as XLSX from 'xlsx';
import {saveAs} from 'file-saver';
import * as moment from 'moment';
import { Injectable } from '@angular/core';

export interface IImportExportService<T> {
  export(name: string, data: T[], exportType: ExportTypes, doSaveAs: boolean): Observable<Blob>;
  import(file: Blob): Observable<T[]>;
}

export enum ExportTypes { XLSX = 'xlsx', CSV = 'csv', RTF = 'rtf'}

@Injectable({
  providedIn: 'root'
})
export class ImportExportService<T> implements IImportExportService<T> {
  list$ = new BehaviorSubject<T[]>([]);

  arrayBuffer: string | ArrayBuffer;

  constructor() { }

  import(file: Blob): Observable<T[]> {
    console.log('import', file);
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const workbook: XLSX.WorkBook = XLSX.read(bstr, {type: 'array', cellDates: true, cellNF: true, raw: true});

      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const data = XLSX.utils.sheet_to_json<T>(worksheet);
      console.log({data});
      this.list$.next(data);
    };
    reader.onerror = (e) => {
      console.log({e});
    }
    reader.readAsArrayBuffer(file);

    return this.list$;
  }

  export(name: string, data: T[], bookType: ExportTypes = ExportTypes.XLSX, doSaveAs = true): Observable<Blob> {
    const ws =  XLSX.utils.json_to_sheet<T>(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, ws, name);
    const wbout = XLSX.write(workbook, { bookType, bookSST: true, type: 'array' });

    const blob = new Blob([wbout], {type: 'application/octet-stream'});

    const fileUrl = window.URL.createObjectURL(blob);
    if (doSaveAs) {
      if (window.navigator.msSaveOrOpenBlob) {
          window.navigator.msSaveOrOpenBlob(blob, fileUrl.split(':')[1] + '.' +  bookType);
      } else {
        saveAs(blob, `${name}-list-${moment().format()}.${bookType}`);
      }
    }
    return of(blob);
   }
}
