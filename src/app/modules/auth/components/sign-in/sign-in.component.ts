import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";

import { AuthService } from "./../../services/auth.service";
import { Unsubscribable } from "../../../shared/models/entity/unsubscribable.entity";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: "app-sign-in",
  templateUrl: "./sign-in.component.html",
  styleUrls: ["./sign-in.component.scss"]
})
export class SignInComponent extends Unsubscribable implements OnInit {

  signInForm = new FormGroup({
    login: new FormControl(""),
    password: new FormControl(""),
  });

  constructor(
    private router: Router,
    private authService: AuthService
  ) { super(); }

  ngOnInit() {
  }

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
