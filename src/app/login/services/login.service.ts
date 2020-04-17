import { IUser } from './../models/IUser';
import { AuthService, SocialUser, GoogleLoginProvider } from 'angularx-social-login';
import { Injectable } from '@angular/core';
import { from, Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

const USER_KEY = 'stored_user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  constructor(private authService: AuthService) {
    authService.authState.subscribe((user) => {
     if (user !== null) {
       localStorage.setItem(USER_KEY, JSON.stringify(user));
     }
    });
  }

  signOut$(): Observable<IUser> {
    console.log('signOut');
    localStorage.removeItem(USER_KEY);
    return from(this.authService.signOut());
  }

  signIn$(): Observable<any> {
    return from( this.authService.signIn(GoogleLoginProvider.PROVIDER_ID)).pipe(tap(data => console.log(data)));

  }

  isLoggedIn$(): Observable<boolean> {
    return this.getUser$().pipe(map(data => data !== null));
  }

  getUser$(): Observable<IUser>  {
    const storedUser = JSON.parse(localStorage.getItem(USER_KEY));
    return of(storedUser)
  }
}
