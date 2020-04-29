import { RouterTestingModule } from '@angular/router/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

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


describe('PlacesFormsComponent', () => {
  let component: PlacesFormsComponent;
  let fixture: ComponentFixture<PlacesFormsComponent>;

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
        }
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
});
