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

describe('ImportExportComponent', () => {
  let component: ImportExportComponent;
  let fixture: ComponentFixture<ImportExportComponent>;

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
});
