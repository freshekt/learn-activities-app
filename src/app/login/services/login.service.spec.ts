import { TestBed, async } from '@angular/core/testing';

import { LoginService } from './login.service';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainModule } from 'src/app/main/main.module';
import { LoginModule } from '../login.module';
import { ClarityModule } from '@clr/angular';
import { LoggerModule } from 'src/app/shared/logger/logger.module';
import { SocialLoginModule, AuthServiceConfig, GoogleLoginProvider } from 'angularx-social-login';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { StoreModule } from '@ngrx/store';
import { appReducers } from 'src/app/store/reducers/app.reducers';
import { EffectsModule } from '@ngrx/effects';
import { LoginEffects } from '../store/effects/login.effects';
import { PlaceEffects } from 'src/app/main/store/effects/places.effects';
import { MainEffects } from 'src/app/main/store/effects/main.effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { LoginComponent } from '../components/login.component';

describe('LoginService', () => {
  let service: LoginService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[
        RouterTestingModule,
    BrowserModule,
    HttpClientModule,

    SocialLoginModule,
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
      declarations: [ LoginComponent ]
    })
    .compileComponents();
  }));
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
