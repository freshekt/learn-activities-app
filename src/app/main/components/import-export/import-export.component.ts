import { selectPlaces } from './../../store/selectors/places.selectors';
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
import { take, takeLast, takeUntil, filter, switchMap, skipUntil, map, tap } from 'rxjs/operators';
import { ActivityPlace } from '../../models/ActivityPlace';
import { ActivityPlacesService } from '../../services/activity-places.service';
import { ExportTypes, ImportExportService } from '../../services/import-export.service';
import * as moment from 'moment';



@Component({
  selector: 'app-import-export',
  templateUrl: './import-export.component.html',
  styleUrls: ['./import-export.component.less']
})
export class ImportExportComponent implements OnInit, OnDestroy {

  @Input() userId: string;

  exportType = ExportTypes;

  impotActivityFile: File;
  impotPlaceFile: File;

  events$ = this.store.pipe(select(selectActivities));
  places$ = this.store.pipe(select(selectPlaces));

  private onDestroy$ = new Subject();


  constructor(private store: Store<IAppState>,
              private activityImportExportService: ImportExportService<Activity>,
              private placeImportExportService: ImportExportService<ActivityPlace>,
              private activityService: ActivityFirebaseService,
              private placeService: ActivityPlacesService,
              private logging: LoggerService) { }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  ngOnInit(): void {
   this.store.dispatch(new GetActivities());
  }

  exportActivity(type: ExportTypes) {
    this.events$.pipe(take(1)).subscribe(events =>
      this.activityImportExportService.export('activity', events, type));
  }

  exportPlaces(type: ExportTypes) {
    this.places$.pipe(take(1)).subscribe(events =>
      this.placeImportExportService.export('place', events, type));
  }

  inputActivityChange(event: Event) {
     const {files} = (event.target as any);
     if (files && files.length) {
      const [file] = files;

      this.impotActivityFile = file;
    }
  }

  inputPlaceChange(event: Event) {
    const {files} = (event.target as any);
    if (files && files.length) {
     const [file] = files;

     this.impotPlaceFile = file;
   }
 }


  importActivity(type: ExportTypes) {
      console.log(this.impotActivityFile);

      switch (type) {
        case ExportTypes.XLSX:
         this.activityImportExportService.import(this.impotActivityFile).pipe(
           filter(data => data.length > 0),
           switchMap((data) => forkJoin(data.map( item => this.activityService.add$(item)))),
           takeUntil(this.onDestroy$)).subscribe(data => this.logging.log(LogType.Information, `import comlete ${data.length} added`));
         break;

        default:
          break;
      }

    }

    importPlaces(type: ExportTypes) {
      console.log(this.impotPlaceFile);

      switch (type) {
        case ExportTypes.XLSX:
         this.placeImportExportService.import(this.impotPlaceFile).pipe(
           filter(data => data.length > 0),
           switchMap((data) => forkJoin(data.map( item => this.placeService.add$(item)))),
           takeUntil(this.onDestroy$)).subscribe(data => this.logging.log(LogType.Information, `import comlete ${data.length} added`));
         break;

        default:
          break;
      }

    }
}

