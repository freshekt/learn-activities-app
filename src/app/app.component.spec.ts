import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { NguiMapModule } from '@ngui/map';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainModule } from './main/main.module';
import { LoginModule } from './login/login.module';
import { ClarityModule } from '@clr/angular';
import { LoggerModule } from './shared/logger/logger.module';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { StoreModule } from '@ngrx/store';
import { appReducers } from './store/reducers/app.reducers';
import { EffectsModule } from '@ngrx/effects';
import { LoginEffects } from './login/store/effects/login.effects';
import { PlaceEffects } from './main/store/effects/places.effects';
import { MainEffects } from './main/store/effects/main.effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { AuthServiceConfig, GoogleLoginProvider } from 'angularx-social-login';


describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,

    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MainModule,
    LoginModule,
    ClarityModule,
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
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  // it(`should have as title 'activities'`, () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.componentInstance;
  //   expect(app.title).toEqual('activities');
  // });

  // it('should render title', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement;
  //   expect(compiled.querySelector('.content span').textContent).toContain('activities app is running!');
  // });
});
