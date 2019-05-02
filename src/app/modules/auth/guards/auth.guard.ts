import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild } from "@angular/router";

import { Observable, of } from "rxjs";

import { AuthService } from "./../services/auth.service";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return this.isAuthenticated(state.url);
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.isAuthenticated(state.url);
  }

  private isAuthenticated(url: string): Observable<boolean> {
    if (this.authService.checkIsAuthenticated()) {
      return of(true);
    }

    this.authService.setRedirectUrl(url);
    this.router.navigate(["sign-in"]);

    return of(false);
  }

}
