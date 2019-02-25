import { Component, OnInit } from "@angular/core";

import { takeUntil } from "rxjs/operators";

import { AuthService } from "./../../../auth/services/auth.service";
import { Unsubscribable } from "../../../shared/models/entity/unsubscribable.entity";

@Component({
  selector: "app-main-layout",
  templateUrl: "./main-layout.component.html",
  styleUrls: ["./main-layout.component.scss"]
})
export class MainLayoutComponent extends Unsubscribable implements OnInit {

  isAuthenticated: boolean;

  constructor(
    private authService: AuthService
  ) { super(); }

  ngOnInit() {
    this.authService.getIsAuthenticated()
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(isAuthenticated => this.isAuthenticated = isAuthenticated);
  }

  onLogOut(): void {
    this.authService.logOut();
    console.log("logout");
  }

  getUserInfo(): void {
    this.authService.getUserInfo();
  }

}
