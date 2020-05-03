import { RouterTestingModule } from '@angular/router/testing';
import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';

import { PlacesFormsComponent } from './places-forms.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatabaseModule } from 'src/app/shared/database/database.module';
import { StoreModule } from '@ngrx/store';
import { appReducers } from 'src/app/store/reducers/app.reducers';
import { EffectsModule } from '@ngrx/effects';
import { LoginEffects } from 'src/app/login/store/effects/login.effects';
import { PlaceEffects } from '../../store/effects/places.effects';
import { MainEffects } from '../../store/effects/main.effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AuthServiceConfig, GoogleLoginProvider } from 'angularx-social-login';
import { LoginModule } from 'src/app/login/login.module';
import { ActivityPlacesService } from '../../services/activity-places.service';
import { of, from } from 'rxjs';
import { take } from 'rxjs/operators';
import { placesTestProvider, mockPlaceData, placeGetAllSpy, placeUpdateSpy, placeRemoveSpy } from '../../services/spys-for-tests';


describe('PlacesFormsComponent', () => {
  let component: PlacesFormsComponent;
  let fixture: ComponentFixture<PlacesFormsComponent>;
  const placesService = jasmine.createSpyObj<ActivityPlacesService>('ActivityPlacesService', ['getAll$', 'search$', 'update$', 'remove$']);


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        DatabaseModule,
        LoginModule,
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
        placesTestProvider
      ],
      declarations: [ PlacesFormsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlacesFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();


  });

  it('should create', () => {
    expect(component).toBeTruthy();

  });

  it('should get all places', (done) => {
    component.places$.subscribe((data => {
      expect(mockPlaceData).toEqual(data);
      expect(placeGetAllSpy.calls.any()).toBe(true, 'getAll called');
      done();
    }));
  });


  it('should call placesService update method', ((done) => {
    component.update(mockPlaceData[0]);

    expect(placeUpdateSpy.calls.any()).toBe(true, 'update called');
    done();

  }));

  it('should call placesService remove method', ((done) => {
    component.remove(mockPlaceData[0]);

    expect(placeRemoveSpy.calls.any()).toBe(true, 'remove called');
    done();

  }));
});
