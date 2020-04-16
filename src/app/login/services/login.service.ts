import { IUser } from './../models/IUser';
import { AuthService, SocialUser, GoogleLoginProvider } from 'angularx-social-login';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private authService: AuthService) { }

  signOut$(): Observable<IUser> {
    return from(this.authService.signOut());
  }
  signIn$(): Observable<any> {
    return from( this.authService.signIn(GoogleLoginProvider.PROVIDER_ID)).pipe(tap(data => console.log(data)));

  }

  isLoggedIn$(): Observable<boolean> {
    return this.authService.authState.pipe(map(data => data !== null));
  }
}
