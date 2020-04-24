import { BehaviorSubject, Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import {saveAs} from 'file-saver';

import { IImportExportService } from './import-export.service';
import * as moment from 'moment';
@Injectable({
  providedIn: 'root'
})
export class XLSXImportExportService<T>  implements IImportExportService<T> {

   list$ = new BehaviorSubject<T[]>([]);

  arrayBuffer: string | ArrayBuffer;

  constructor() { }

  import(file: File): Observable<T[]> {

    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const workbook: XLSX.WorkBook = XLSX.read(bstr, {type: 'array'});

      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const data = XLSX.utils.sheet_to_json<T>(worksheet);
      this.list$.next(data);
    };
    reader.onerror = (e) => console.log(e);
    reader.readAsArrayBuffer(file);

    return this.list$;
  }

  export(name: string, data: T[]) {
    const ws =  XLSX.utils.json_to_sheet<T>(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, ws, name);
    const wbout = XLSX.write(workbook, { bookType: 'xlsx', bookSST: false, type: 'array' });

    const blob = new Blob([wbout], {type: 'application/octet-stream'});
    const fileUrl = window.URL.createObjectURL(blob);
    if (window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(blob, fileUrl.split(':')[1] + '.xlsx');
    } else {
      saveAs(blob, `${name}-list-${moment().format()}.xlsx`);
    }
   }
}
