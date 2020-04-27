import { BehaviorSubject, Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import {saveAs} from 'file-saver';
import * as moment from 'moment';
import { IImportExportService, ImportExportService } from './import-export.service';

@Injectable({
  providedIn: 'root'
})
export class XLSXImportExportService<T> extends ImportExportService<T>  implements IImportExportService<T> {

}
