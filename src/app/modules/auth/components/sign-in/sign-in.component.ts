import { Component } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";

import { takeUntil, tap, switchMap, filter } from "rxjs/operators";

import { Store } from "@ngrx/store";

import { AuthService } from "./../../services/auth.service";
import { Unsubscribable } from "../../../shared/models/entity/unsubscribable.entity";
import { LogIn } from "../../store/auth.actions";
import { UserInfo } from "./../../store/auth.actions";
import { isUserResponse, UserResponse } from "./../../models/interface/user-response.interface";
import { isLoginResponse, LoginResponse } from "./../../models/interface/login-response.interface";
import { AppState } from "../../../core/models/interfaces/app-state.interface";

@Component({
  selector: "app-sign-in",
  templateUrl: "./sign-in.component.html",
  styleUrls: ["./sign-in.component.scss"]
})
export class SignInComponent extends Unsubscribable {

  signInForm = new FormGroup({
    login: new FormControl(""),
    password: new FormControl(""),
  });

  constructor(
    private router: Router,
    private authService: AuthService,
    private store: Store<AppState>
  ) { super(); }

  signIn() {
    console.log(this.signInForm.value);
    this.authService.logIn(this.signInForm.value)
      .pipe(
        takeUntil(this.ngUnsubscribe$),
        filter(res => !!isLoginResponse(res)),
        tap(this.dispatchToken),
        switchMap(res => this.authService.loadUserInfo(res.token)),
        tap(this.dispatchUserInfo)
      )
      .subscribe(() => {
        const url = this.authService.getRedirectUrl() ? this.authService.getRedirectUrl() : "";
        this.router.navigate([url]);
      });
  }

  private dispatchToken = (res: LoginResponse): void => {
    if (isLoginResponse(res)) {
      this.store.dispatch(new LogIn(!!res.token));
    }
  }

  private dispatchUserInfo = (res: UserResponse): void => {
    if (isUserResponse(res)) {
      this.store.dispatch(new UserInfo(res.name));
    }
  }

}
