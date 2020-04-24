import { LogType } from 'src/app/shared/logger/models/LogType';
import { ActivityFirebaseService } from './../../services/activity-firebase.service';
import { selectActivities } from './../../store/selectors/main.selectors';
import { Activity } from './../../models/Activity';
import { XLSXImportExportService } from './../../services/XLSXImportExportService';
import { LoggerService } from 'src/app/shared/logger/services/logger.service';
import { IAppState } from 'src/app/store/state/app.state';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { GetActivities } from '../../store/actions/main.actions';
import { Subject, concat, forkJoin } from 'rxjs';
import { take, takeLast, takeUntil, filter, switchMap } from 'rxjs/operators';

export enum ImportExportType {
  XSLX
}

@Component({
  selector: 'app-import-export',
  templateUrl: './import-export.component.html',
  styleUrls: ['./import-export.component.less']
})
export class ImportExportComponent implements OnInit, OnDestroy {

  @Input() userId: string;

  exportType = ImportExportType;

  impotFile: File;

  events$ = this.store.pipe(select(selectActivities));

   private onDestroy$ = new Subject();

  constructor(private store: Store<IAppState>,
              private activityXlsxService: XLSXImportExportService<Activity>,
              private activityService: ActivityFirebaseService,
              private logging: LoggerService) { }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  ngOnInit(): void {
   this.store.dispatch(new GetActivities());
  }

  export(type: ImportExportType) {
    this.events$.pipe(take(1)).subscribe(events => {
      switch (type) {
        case ImportExportType.XSLX:
          this.activityXlsxService.export('activity', events);
          break;

        default:
          break;
      }


    });
  }

  inputChange(event: Event) {
     const {files} = (event.target as any);
     if (files && files.length) {
      const [file] = files;

      this.impotFile = file;
    }
  }


  import(type: ImportExportType) {
      console.log(this.impotFile);

      switch (type) {
        case ImportExportType.XSLX:
         this.activityXlsxService.import(this.impotFile).pipe(
           filter(data => data.length > 0),
           switchMap((data) => forkJoin(data.map( item => this.activityService.add$(item)))),
           takeUntil(this.onDestroy$)).subscribe(data => this.logging.log(LogType.Information, `import comlete ${data.length} added`));
         break;

        default:
          break;
      }

    }
}

