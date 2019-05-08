import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot
} from "@angular/router";
import { Injectable } from "@angular/core";

import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

import { select, Store } from "@ngrx/store";

import { AppState } from "./../../core/store/AppState";
import { AuthService } from "./../services/auth.service";
import { selectIsAuthenticated } from "../store/auth.selectors";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(
    private router: Router,
    private authService: AuthService,
    private store: Store<AppState>
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return this.checkIsAuthenticated(state.url);
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.checkIsAuthenticated(state.url);
  }

  private checkIsAuthenticated(url: string): Observable<boolean> {
    return this.store.pipe(
      select(selectIsAuthenticated),
      tap(() => this.authService.setRedirectUrl(url)),
      tap(isAuthenticated => {
        if (!isAuthenticated) {
          this.router.navigate(["sign-in"]);
        }
      })
    );
  }

}
