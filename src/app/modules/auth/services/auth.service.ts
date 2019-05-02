import { isUserResponse } from "./../models/interface/user-response.interface";
import { Injectable } from "@angular/core";

import { BehaviorSubject, Observable } from "rxjs";
import { tap, map } from "rxjs/operators";

import { AuthRemoteService } from "./auth-remote.service";
import { LoginResponse } from "../models/interface/login-response.interface";
import { LoginData } from "../models/interface/login-data.interface";
import { UserResponse, UserName } from "../models/interface/user-response.interface";

@Injectable({
  providedIn: "root"
})
export class AuthService {

  private isAuthenticated$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private redirectUrl$: BehaviorSubject<string> = new BehaviorSubject<string>("");
  private userInfo$: BehaviorSubject<UserName> = new BehaviorSubject<UserName>({ first: "", last: "" });

  constructor(private remote: AuthRemoteService) {
    this.isLoggedIn();
  }

  getIsAuthenticated(): Observable<boolean> {
    return this.isAuthenticated$.asObservable();
  }

  setIsAuthenticated(value: boolean): void {
    this.isAuthenticated$.next(value);
  }

  checkIsAuthenticated(): boolean {
    return this.isData() && this.isAuthenticated$.getValue();
  }

  setRedirectUrl(url: string) {
    this.redirectUrl$.next(url);
  }

  getRedirectUrl(): string {
    return this.redirectUrl$.getValue();
  }

  logIn(data: LoginData): Observable<void> {
    return this.remote.login<LoginData, LoginResponse>(data)
      .pipe(
        tap(console.log),
        map((res: LoginResponse) => {
          localStorage.setItem("token", res.token);
          this.setIsAuthenticated(true);
        }),
        tap(this.loadUserInfo)
      );
  }

  logOut(): void {
    localStorage.removeItem("token");
    this.setIsAuthenticated(false);
  }

  getUserInfo(): Observable<UserName> {
    if (this.isData()) {
      return this.loadUserInfo();
    }
    return this.userInfo$.asObservable();
  }

  getToken(): string | null {
    const token = localStorage.getItem("token");

    if (this.isAuthenticated$.getValue() && token) {
      return token;
    }

    return null;
  }

  private isLoggedIn(): void {
    if (this.isData()) {
      this.setIsAuthenticated(true);
      this.loadUserInfo();
    }
  }

  private loadUserInfo = (): Observable<UserName> => {
    this.remote.getUserInfo<string, UserResponse>(localStorage.getItem("token"))
      .subscribe((info: UserResponse | boolean) => {
        if (isUserResponse(info)) {
          return this.userInfo$.next(info.name);
        }
        return this.userInfo$.next({ first: "", last: "" });
      });
    return this.userInfo$.asObservable();
  }

  private isData(): boolean {
    return !!localStorage.getItem("token");
  }

}
