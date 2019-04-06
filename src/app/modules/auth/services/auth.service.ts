import { Injectable } from "@angular/core";

import { BehaviorSubject, Observable, of } from "rxjs";
import { tap } from "rxjs/operators";

import { AuthRemoteService } from "./auth-remote.service";
import { LoginResponse } from "../models/interface/login-response.interface";
import { LoginData } from "../models/interface/login-data.interface";
import { UserResponse } from "../models/interface/user-response.interface";

@Injectable({
  providedIn: "root"
})
export class AuthService {

  private isAuthenticated$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private redirectUrl$: BehaviorSubject<string> = new BehaviorSubject<string>("");

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
    return this.isAuthenticated$.getValue();
  }

  setRedirectUrl(url: string) {
    this.redirectUrl$.next(url);
  }

  getRedirectUrl(): string {
    return this.redirectUrl$.getValue();
  }

  logIn(data: LoginData): void {
    this.remote.login<LoginData, LoginResponse>(data)
      .pipe(
        tap(console.log)
      )
      .subscribe(
        (res: LoginResponse) => {
          localStorage.setItem("token", res.token);
          this.setIsAuthenticated(true);
        },
        error => console.error(error.message)
      );
  }

  logOut(): void {
    localStorage.removeItem("token");
    this.setIsAuthenticated(false);
  }

  getUserInfo(): Observable<UserResponse | boolean> {
    if (this.isData()) {
      return this.remote.getUserInfo<string, UserResponse>(localStorage.getItem("token")).pipe(
        tap(console.log)
      );
    }

    return of(false);
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
    }
  }

  private isData(): boolean {
    return !!localStorage.getItem("token");
  }

}
