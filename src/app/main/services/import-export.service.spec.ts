import { DatabaseModule } from 'src/app/shared/database/database.module';
import {  HttpClientModule } from '@angular/common/http';
import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ImportExportService } from './import-export.service';
import { NguiMapModule } from '@ngui/map';

describe('ImportExportService', () => {
  let service: ImportExportService<any>;



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
});
