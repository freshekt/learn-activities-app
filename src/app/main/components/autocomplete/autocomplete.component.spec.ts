import {
  activityTestProvider,
  placesTestProvider,
  mockPlaceData,
  loginTestProvider,
  placeSearchSpy,
  activityPlacesService } from './../../services/spys-for-tests';
import { FormControl } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutocompleteComponent } from './autocomplete.component';
import { MainModule } from '../../main.module';
import { StoreModule } from '@ngrx/store';
import { appReducers } from 'src/app/store/reducers/app.reducers';
import { EffectsModule } from '@ngrx/effects';
import { LoginEffects } from 'src/app/login/store/effects/login.effects';
import { PlaceEffects } from '../../store/effects/places.effects';
import { MainEffects } from '../../store/effects/main.effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { of } from 'rxjs';
import { AuthServiceConfig, GoogleLoginProvider } from 'angularx-social-login';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';

describe('AutocompleteComponent', () => {
  let component: AutocompleteComponent;
  let fixture: ComponentFixture<AutocompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MainModule,
        StoreModule.forRoot(appReducers),
        AngularFireModule.initializeApp(environment.firebase),
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
        loginTestProvider,
        activityTestProvider,
        placesTestProvider,

      ],
      declarations: [ AutocompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutocompleteComponent);
    component = fixture.componentInstance;
    component.control = new FormControl('');
    component.userId = '1';
    fixture.detectChanges();
  });

  it('should not create place', () => {
    const placeNotAddSpy =  activityPlacesService.add$.and.returnValue(of(mockPlaceData[0]));
    component.add({...mockPlaceData[0]});
    fixture.detectChanges();
    expect(placeNotAddSpy.calls.any()).toBe(false, ' place create not called');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });



  it('should create place', () => {
    const placeAddSpy =  activityPlacesService.add$.and.returnValue(of(mockPlaceData[0]));
    component.add({...mockPlaceData[0], placeId: '3'});
    fixture.detectChanges();
    expect(placeAddSpy.calls.any()).toBe(true, ' place create called');
  });



  it('should search places', () => {

    placeSearchSpy.and.callFake((query) => {
      console.log(`should search places ${query}`);
      return of(mockPlaceData);
    });
    component.control.setValue('a');
    fixture.detectChanges();

    expect(placeSearchSpy.calls.any()).toBe(true, ' place create called');
});
});
