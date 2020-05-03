import { filter, switchMap, take, takeLast, skipWhile, tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { DatabaseModule } from 'src/app/shared/database/database.module';
import { TestBed, fakeAsync, tick, flushMicrotasks, async } from '@angular/core/testing';
import { ImportExportService, ExportTypes } from './import-export.service';

describe('ImportExportService', () => {
  let service: ImportExportService<any>;
  const file$ = new BehaviorSubject<Blob>(null);
  const data = [{ name: 'a'}, { name: 'b'}];
  let originalTimeout: number;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        DatabaseModule
      ]
    });
    service = TestBed.inject(ImportExportService);
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 6000;
  });

  afterEach(() => {
     jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
   });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return array',  (done: DoneFn) => {

    const started = performance.now();
    console.log(`should return array ${started}`);
    let result: any;
    file$.pipe(
      filter(file => file !== null),
      tap(() => console.log('move on')),
      switchMap((file: Blob) => service.import(file)),
      tap((array) => console.log('imported array ', {array})),
      filter(d => d.length > 0)
      ).subscribe(items => {
      result = items;
      const ended = performance.now();
      console.log(`should return array ${ended} duration: ${ended - started}`, {result});
      expect(data).toEqual(result);
      done();

    });

  });

  it('should return blob', (done: DoneFn) => {
    service.export('test', data, ExportTypes.XLSX, false).pipe(take(1)).subscribe(blob => {
      console.log({blob});

      expect(blob instanceof Blob).toBeTrue();

      done();
      file$.next(blob);
    });
  });




});
