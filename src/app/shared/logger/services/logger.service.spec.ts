import { RouterTestingModule } from '@angular/router/testing';
import { TestBed } from '@angular/core/testing';

import { LoggerService } from './logger.service';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { LoggerModule } from '../logger.module';
import { AuthServiceConfig, GoogleLoginProvider } from 'angularx-social-login';
import { environment } from 'src/environments/environment';

describe('LoggerService', () => {
  let service: LoggerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
    RouterTestingModule,
    BrowserModule,
    HttpClientModule,
    LoggerModule,
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
    });
    service = TestBed.inject(LoggerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
