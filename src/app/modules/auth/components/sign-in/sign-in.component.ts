import { Component } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";

import { takeUntil } from "rxjs/operators";

import { AuthService } from "./../../services/auth.service";
import { Unsubscribable } from "../../../shared/models/entity/unsubscribable.entity";

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
    private authService: AuthService
  ) { super(); }

  signIn() {
    console.log(this.signInForm.value);
    this.authService.logIn(this.signInForm.value)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(() => {
        const url = this.authService.getRedirectUrl() ? this.authService.getRedirectUrl() : "";
        this.router.navigate([url]);
      });
  }

}
