import { LoaderService } from "./../../../shared/services/loader.service";
import { Component, OnInit } from "@angular/core";

import { Observable } from "rxjs";

import { AuthService } from "./../../../auth/services/auth.service";
import { Unsubscribable } from "../../../shared/models/entity/unsubscribable.entity";
import { Router } from "@angular/router";
import { UserName } from "./../../../auth/models/interface/user-response.interface";

@Component({
  selector: "app-main-layout",
  templateUrl: "./main-layout.component.html",
  styleUrls: ["./main-layout.component.scss"]
})
export class MainLayoutComponent extends Unsubscribable implements OnInit {

  isAuthenticated$: Observable<boolean>;
  loading$: Observable<boolean>;
  login$: Observable<UserName>;

  constructor(
    private router: Router,
    private authService: AuthService,
    private loaderService: LoaderService
  ) { super(); }

  ngOnInit() {
    this.isAuthenticated$ = this.authService.getIsAuthenticated();
    this.login$ = this.authService.getUserInfo();
    this.loading$ = this.loaderService.getLoading();
  }

  onLogOut(): void {
    this.authService.logOut();
    console.log("logout");
    this.router.navigate(["sign-in"]);
  }

}
