import { Component, OnInit } from "@angular/core";

import { takeUntil } from "rxjs/operators";

import { AuthService } from "./../../../auth/services/auth.service";
import { Unsubscribable } from "../../../shared/models/entity/unsubscribable.entity";
import { Router } from "@angular/router";

@Component({
  selector: "app-main-layout",
  templateUrl: "./main-layout.component.html",
  styleUrls: ["./main-layout.component.scss"]
})
export class MainLayoutComponent extends Unsubscribable implements OnInit {

  isAuthenticated: boolean;
  login: string;

  constructor(
    private router: Router,
    private authService: AuthService
  ) { super(); }

  ngOnInit() {
    this.authService.getIsAuthenticated()
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(isAuthenticated => {
        this.isAuthenticated = isAuthenticated;
        const login = this.getUserInfo();
        this.login = login ? login : "";
      });
  }

  onLogOut(): void {
    this.authService.logOut();
    console.log("logout");
    this.router.navigate(["sign-in"]);
  }

  private getUserInfo(): string | void {
    return this.authService.getUserInfo();
  }

}
