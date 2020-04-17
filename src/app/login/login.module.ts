import { LoggerModule } from './../shared/logger/logger.module';
import { AuthGuard } from './guards/auth.guard';
import { environment } from './../../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SocialLoginModule, AuthServiceConfig, GoogleLoginProvider } from 'angularx-social-login';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { LoginEffects } from './store/effects/login.effects';
import { loginReducer } from './store/reducers/login.reducers';


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LoggerModule,
    SocialLoginModule,
    StoreModule.forRoot(loginReducer),
    EffectsModule.forRoot([LoginEffects]),
  ],
  exports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SocialLoginModule,
    LoggerModule,
    LoginComponent
  ],
  providers: [
    AuthGuard,
    {
      provide: AuthServiceConfig,
      useFactory: () =>  new AuthServiceConfig([
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider(environment.googleClientId)
        }
      ])

    }
  ]
})
export class LoginModule { }
