import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityFormComponent } from './activity-form.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { StoreModule } from '@ngrx/store';
import { appReducers } from 'src/app/store/reducers/app.reducers';
import { EffectsModule } from '@ngrx/effects';
import { LoginEffects } from 'src/app/login/store/effects/login.effects';
import { PlaceEffects } from '../../store/effects/places.effects';
import { MainEffects } from '../../store/effects/main.effects';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainModule } from '../../main.module';
import { LoginModule } from 'src/app/login/login.module';
import { ClarityModule } from '@clr/angular';
import { LoggerModule } from 'src/app/shared/logger/logger.module';
import { SocialLoginModule, AuthServiceConfig, GoogleLoginProvider } from 'angularx-social-login';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { BehaviorSubject } from 'rxjs';
import { Activity } from '../../models/Activity';

describe('ActivityFormComponent', () => {
  let component: ActivityFormComponent;
  let fixture: ComponentFixture<ActivityFormComponent>;

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
          declarations: [ ActivityFormComponent ]
        })
        .compileComponents();
      }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityFormComponent);

    component = fixture.componentInstance;

    component.model$ = new BehaviorSubject<Activity>({
      id: '',
      title: '',
      start: '',
      end: '',
      description: '',
      userId: '',
      placeId: ''
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
