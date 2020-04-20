
import { LoginEffects } from './login/store/effects/login.effects';
import { appReducers } from './store/reducers/app.reducers';
import { MainModule } from './main/main.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClarityModule } from '@clr/angular';
import { AngularFireModule } from '@angular/fire';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginModule } from './login/login.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { AuthServiceConfig, GoogleLoginProvider } from 'angularx-social-login';
import { environment } from '../environments/environment';
import { LoggerModule } from './shared/logger/logger.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MainModule,
    LoginModule,
    ClarityModule,
    LoggerModule,
    AngularFireModule.initializeApp(environment.firebase),
    StoreModule.forRoot(appReducers),
    EffectsModule.forRoot([LoginEffects]),
    StoreRouterConnectingModule.forRoot({stateKey: 'router'}),
    AppRoutingModule
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
  bootstrap: [AppComponent]
})
export class AppModule { }
