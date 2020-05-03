import { activityGetAllSpy, placeGetAllSpy, loginTestProvider, mockActivityData } from './../../services/spys-for-tests';
import { RouterTestingModule } from '@angular/router/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitiesComponent } from './activities.component';
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
import { MainModule } from '../../main.module';
import { activityTestProvider, placesTestProvider } from '../../services/spys-for-tests';
import { Subject } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';
import * as moment from 'moment';

describe('ActivitiesComponent', () => {
  let component: ActivitiesComponent;
  let fixture: ComponentFixture<ActivitiesComponent>;
  const onNextTest$ = new  Subject();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MainModule,
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
        loginTestProvider
      ],
      declarations: [ ActivitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    onNextTest$.next();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get all user activities', () => {
    expect(activityGetAllSpy.calls.any()).toBe(true, 'get all called');
  });

  it('should get all user places', () => {
    expect(placeGetAllSpy.calls.any()).toBe(true, 'get all called');
  });

  it('should change value by adding', (done) => {
    component.editableModel$.pipe(filter(s => s !== null), takeUntil(onNextTest$)).subscribe(data => {
      expect({
        id: '',
        title: '',
        start: moment().format('L'),
        end: '',
        description: '',
        userId: '1',
        placeId: ''
      }).toEqual(data);
      done();
    });

    component.addActivity(null);

  });

  it('should take filtered data', () => {
   expect([mockActivityData[0]]).toEqual(component.filterEvents(mockActivityData, moment().format('L')));
   expect([]).toEqual(component.filterEvents(mockActivityData, moment().add(-1, 'day').format('L')));
   expect([mockActivityData[1]]).toEqual(component.filterEvents(mockActivityData, moment().add(+1, 'day').format('L')));

  });

});
