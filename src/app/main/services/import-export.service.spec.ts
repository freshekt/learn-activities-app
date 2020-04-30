import { filter, switchMap, take, takeLast } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { DatabaseModule } from 'src/app/shared/database/database.module';
import { TestBed, fakeAsync } from '@angular/core/testing';
import { ImportExportService, ExportTypes } from './import-export.service';

describe('ImportExportService', () => {
  let service: ImportExportService<any>;
  const file$ = new BehaviorSubject<Blob>(null);
  const data = [{ name: 'a'}, { name: 'b'}];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        DatabaseModule
      ]
    });
    service = TestBed.inject(ImportExportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return blob', ((done: DoneFn) => {
    service.export('test', data, ExportTypes.XLSX, false).pipe(take(1)).subscribe(blob => {
      console.log({blob});

      expect(blob instanceof Blob).toBeTrue();
      done();
      file$.next(blob);
    });
  }));

  it('should return array',  fakeAsync((done: DoneFn) => {
    file$.pipe(filter(file => file !== null), switchMap((file: Blob) => service.import(file)), takeLast(1)).subscribe(items => {
      expect(items).toEqual(data);
      done();
    });
  }));


});
