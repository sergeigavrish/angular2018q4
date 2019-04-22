import { LoaderService } from "./../../../shared/services/loader.service";
import { Component, OnInit } from "@angular/core";

import { takeUntil } from "rxjs/operators";

import { AuthService } from "./../../../auth/services/auth.service";
import { Unsubscribable } from "../../../shared/models/entity/unsubscribable.entity";
import { Router } from "@angular/router";
import { UserName, UserResponse, isUserResponse } from "./../../../auth/models/interface/user-response.interface";
import { Observable } from "rxjs";

@Component({
  selector: "app-main-layout",
  templateUrl: "./main-layout.component.html",
  styleUrls: ["./main-layout.component.scss"]
})
export class MainLayoutComponent extends Unsubscribable implements OnInit {

  isAuthenticated: boolean;
  loading$: Observable<boolean>;
  login: UserName = { first: "", last: "" };

  constructor(
    private router: Router,
    private authService: AuthService,
    private loaderService: LoaderService
  ) { super(); }

  ngOnInit() {
    this.authService.getIsAuthenticated()
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(isAuthenticated => {
        this.isAuthenticated = isAuthenticated;
        this.getUserInfo();
      });

    this.loading$ = this.loaderService.getLoading();
  }

  onLogOut(): void {
    this.authService.logOut();
    console.log("logout");
    this.router.navigate(["sign-in"]);
  }

  private getUserInfo(): void {
    this.authService.getUserInfo()
      .subscribe((info: UserResponse | boolean) => {
        if (isUserResponse(info)) {
          return this.login = info.name;
        }
      });
  }

}
