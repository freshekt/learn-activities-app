import { RouterTestingModule } from '@angular/router/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoggerModule } from 'src/app/shared/logger/logger.module';
import { SocialLoginModule, AuthServiceConfig, GoogleLoginProvider } from 'angularx-social-login';
import { StoreModule } from '@ngrx/store';
import { loginReducer } from '../store/reducers/login.reducers';
import { EffectsModule } from '@ngrx/effects';
import { LoginEffects } from '../store/effects/login.effects';
import { environment } from 'src/environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainModule } from 'src/app/main/main.module';
import { LoginModule } from '../login.module';
import { ClarityModule } from '@clr/angular';
import { AngularFireModule } from '@angular/fire';
import { appReducers } from 'src/app/store/reducers/app.reducers';
import { PlaceEffects } from 'src/app/main/store/effects/places.effects';
import { MainEffects } from 'src/app/main/store/effects/main.effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[
        RouterTestingModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MainModule,
    LoginModule,
    ClarityModule,
    LoggerModule,
    SocialLoginModule,
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
      declarations: [ LoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
