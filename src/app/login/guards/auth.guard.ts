import { LoginService } from './../services/login.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private loginService: LoginService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      return this.loginService.isLoggedIn$().pipe(tap(isLoggedIn => {
        if (!isLoggedIn) {
          this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        }
      }));
    }
}
