import { ImportExportService, ExportTypes } from './../../services/import-export.service';
import { activityTestProvider, placesTestProvider, mockActivityData, activityAddSpy, placeAddSpy } from './../../services/spys-for-tests';
import { LoggerModule } from './../../../shared/logger/logger.module';
import { RouterTestingModule } from '@angular/router/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportExportComponent } from './import-export.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { StoreModule } from '@ngrx/store';
import { appReducers } from 'src/app/store/reducers/app.reducers';
import { EffectsModule } from '@ngrx/effects';
import { LoginEffects } from 'src/app/login/store/effects/login.effects';
import { PlaceEffects } from '../../store/effects/places.effects';
import { MainEffects } from '../../store/effects/main.effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { AuthServiceConfig, GoogleLoginProvider } from 'angularx-social-login';
import { LoginModule } from 'src/app/login/login.module';
import { Activity } from '../../models/Activity';
import { ActivityPlace } from '../../models/ActivityPlace';
import { of } from 'rxjs';

describe('ImportExportComponent', () => {
  let component: ImportExportComponent;
  let fixture: ComponentFixture<ImportExportComponent>;
  const importExportTestService = jasmine.createSpyObj<ImportExportService<any>>('ImportExportService', ['import', 'export']);
  const exportSpy = importExportTestService.export.and.returnValue(of(new Blob()));
  const importSpy = importExportTestService.import.and.returnValue(of(mockActivityData));
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[
        RouterTestingModule,
        LoginModule,
        LoggerModule,
        AngularFireModule.initializeApp(environment.firebase),
        StoreModule.forRoot(appReducers),
        EffectsModule.forRoot([LoginEffects, PlaceEffects, MainEffects]),
        StoreRouterConnectingModule.forRoot({stateKey: 'router'})
      ],
      providers: [
        {
          provide: AuthServiceConfig,
          useFactory: () => {
            console.log({environment});
            return  new AuthServiceConfig([
            {
              id: GoogleLoginProvider.PROVIDER_ID,
              provider: new GoogleLoginProvider(environment.googleClientId)
            }
          ]);
        }
        },
        activityTestProvider,
        placesTestProvider,
        {
          provide: ImportExportService,
          useValue: importExportTestService
        }
      ],
      declarations: [ ImportExportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportExportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should export activity', () => {
    component.exportActivity(ExportTypes.XLSX);
    expect(exportSpy.calls.any()).toBe(true, 'export called');
  });

  it('should export places', () => {
    component.exportPlaces(ExportTypes.XLSX);
    expect(exportSpy.calls.any()).toBe(true, 'export called');
  });

  it('should import activity', () => {
    component.impotActivityFile = new File([], 'test.xlsx');
    component.importActivity(ExportTypes.XLSX);
    expect(activityAddSpy.calls.any()).toBe(true, 'import called');

  });

  it('should import places', () => {
    component.impotPlaceFile = new File([], 'test.xlsx');
    component.importPlaces(ExportTypes.XLSX);
    expect(placeAddSpy.calls.any()).toBe(true, 'import called');

  });

});
