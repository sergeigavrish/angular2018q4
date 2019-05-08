import { Injectable } from "@angular/core";

import { BehaviorSubject, Observable } from "rxjs";
import { tap } from "rxjs/operators";

import { AuthRemoteService } from "./auth-remote.service";
import { LoginResponse } from "../models/interface/login-response.interface";
import { LoginData } from "../models/interface/login-data.interface";
import { UserResponse } from "../models/interface/user-response.interface";
import { isLoginResponse } from "./../models/interface/login-response.interface";

@Injectable({
  providedIn: "root"
})
export class AuthService {

  private redirectUrl$: BehaviorSubject<string> = new BehaviorSubject<string>("");

  constructor(private remote: AuthRemoteService) { }

  setRedirectUrl(url: string) {
    this.redirectUrl$.next(url);
  }

  getRedirectUrl(): string {
    return this.redirectUrl$.getValue();
  }

  logIn(data: LoginData): Observable<LoginResponse> {
    return this.remote.login<LoginData, LoginResponse>(data)
      .pipe(
        tap(res => {
          if (isLoginResponse(res)) {
            localStorage.setItem("token", res.token);
          }
        })
      );
  }

  logOut(): void {
    localStorage.removeItem("token");
  }

  getToken(): string | null {
    const token = localStorage.getItem("token");

    if (token) {
      return token;
    }

    return null;
  }

  loadUserInfo(token: string): Observable<UserResponse> {
    return this.remote.getUserInfo<string, UserResponse>(token);
  }

}
