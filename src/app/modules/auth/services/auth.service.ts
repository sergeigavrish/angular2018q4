import { Injectable } from "@angular/core";

import { BehaviorSubject, Observable } from "rxjs";

import { User } from "./../../user/models/interface/user.interface";
import { UserEntity } from "./../../user/models/entity/user.entity";

@Injectable({
  providedIn: "root"
})
export class AuthService {

  private isAuthenticated$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private redirectUrl$: BehaviorSubject<string> = new BehaviorSubject<string>("");

  constructor() {
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

  logIn(): void {
    const user = new UserEntity("1", "Dmitriy", "Malikov");
    const token = "ETO_TOKEN";
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    this.setIsAuthenticated(true);
  }

  logOut(): void {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    this.setIsAuthenticated(false);
  }

  getUserInfo(): string | void {
    if (this.isData()) {
      const user = JSON.parse(localStorage.getItem("user")) as User;
      const newUser = new UserEntity(user.id, user.firstName, user.lastName);
      return newUser.getFullName();
    }
  }

  private isLoggedIn(): void {
    if (this.isData()) {
      this.setIsAuthenticated(true);
    }
  }

  private isData() {
    return JSON.parse(localStorage.getItem("user")) && localStorage.getItem("token");
  }

}
