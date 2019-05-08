import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { Observable } from "rxjs";

import { Store, select } from "@ngrx/store";

import { AuthService } from "./../../../auth/services/auth.service";
import { Unsubscribable } from "../../../shared/models/entity/unsubscribable.entity";
import { UserName } from "./../../../auth/models/interface/user-response.interface";
import { LoaderService } from "../../services/loader.service";
import { AppState } from "./../../store/AppState";
import { selectIsAuthenticated, selectUserInfo } from "../../../auth/store/auth.selectors";

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
    private loaderService: LoaderService,
    private store: Store<AppState>
  ) { super(); }

  ngOnInit() {
    this.isAuthenticated$ = this.store.pipe(select(selectIsAuthenticated));
    this.login$ = this.store.pipe(select(selectUserInfo));
    this.loading$ = this.loaderService.getLoading();
  }

  onLogOut(): void {
    this.authService.logOut();
    console.log("logout");
    this.router.navigate(["sign-in"]);
  }

}
